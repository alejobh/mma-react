import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

import Login from './index';

const queryClient = new QueryClient();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  const routerDom = jest.requireActual('react-router-dom');

  return {
    ...routerDom,
    useHistory: () => ({ push: mockHistoryPush })
  };
});

describe('Login screen', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  const fillForm = () => {
    userEvent.type(screen.getByLabelText('Common:email'), 'test@test.com');
    userEvent.type(screen.getByLabelText('Common:password'), 'test12');
  };

  describe('Form with invalid input', () => {
    test('Error message on submitting', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Common:login' }));
      expect(await screen.findAllByText('FormValidations:requiredField')).not.toBe([]);
    });

    test('Error message on invalid email', async () => {
      fillForm();
      const emailInput = screen.getByLabelText('Common:email');
      emailInput.setSelectionRange(10, 13);
      userEvent.type(emailInput, '{backspace}');
      userEvent.click(screen.getByRole('button', { name: 'Common:login' }));
      expect(emailInput).toHaveValue('test@test.');
      expect(await screen.findByText('FormValidations:emailError')).toBeVisible();
    });
  });

  describe('Form with valid input', () => {
    const STATUS_OK = 200;
    const STATUS_UNAUTHORIZED = 401;
    const STATUS_ERROR = 422;
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    const server = setupServer(
      rest.post('https://books-training-rails.herokuapp.com/api/v1/users/sign_in', (req, res, ctx) =>
        res(ctx.status(STATUS_OK), ctx.json({ response: { data: { ok: true } } }))
      )
    );
    beforeAll(() => {
      server.listen();
    });
    beforeEach(() => {
      fillForm();
    });
    afterEach(() => {
      server.resetHandlers();
    });
    afterAll(() => {
      server.close();
    });

    test('Submit successful', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Common:login' }));
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/book-list'));
    });

    describe('Submit wrong credentials failed', () => {
      const failurePostMock = (status: number) =>
        rest.post('https://books-training-rails.herokuapp.com/api/v1/users/sign_in', (req, res, ctx) =>
          res(ctx.status(status), ctx.json({ response: { data: { ok: false } } }))
        );
      test('Wrong credentials', async () => {
        server.use(failurePostMock(STATUS_UNAUTHORIZED));
        userEvent.click(screen.getByRole('button', { name: 'Common:login' }));
        expect(await screen.findByRole('button', { name: 'Common:login' })).toBeVisible();
        expect(await screen.findByText('Login:invalidCredentials')).toBeVisible();
      });

      test('Generic error', async () => {
        server.use(failurePostMock(STATUS_ERROR));
        userEvent.click(screen.getByRole('button', { name: 'Common:login' }));
        expect(await screen.findByRole('button', { name: 'Common:login' })).toBeVisible();
        expect(await screen.findByText('Common:submitError')).toBeVisible();
      });
    });
  });
});
