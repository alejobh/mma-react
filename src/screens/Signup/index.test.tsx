import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

import Signup from 'screens/Signup';

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

describe('Signup screen', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </QueryClientProvider>
    );
  });

  const fillForm = () => {
    userEvent.type(screen.getByLabelText('Signup:firstName'), 'test');
    userEvent.type(screen.getByLabelText('Signup:lastName'), 'test');
    userEvent.type(screen.getByLabelText('common:email'), 'test@test.com');
    userEvent.type(screen.getByLabelText('common:password'), 'test12');
    userEvent.type(screen.getByLabelText('Signup:passwordConfirmation'), 'test12');
  };

  describe('Form with invalid input', () => {
    describe('Unfilled inputs', () => {
      test('Error message on submitting', async () => {
        userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
        expect(await screen.findAllByText('common:requiredField')).not.toBe([]);
      });
    });

    describe('Invalid inputs', () => {
      beforeEach(() => {
        fillForm();
      });

      test('Error message on short password', async () => {
        userEvent.type(screen.getByLabelText('common:password'), '{backspace}');
        userEvent.type(screen.getByLabelText('Signup:passwordConfirmation'), '{backspace}');
        userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
        expect(screen.getByLabelText('common:password')).toHaveValue('test1');
        expect(screen.getByLabelText('Signup:passwordConfirmation')).toHaveValue('test1');
        expect(await screen.findByText('Signup:passwordLengthError')).toBeVisible();
      });
      test('Error message on confirmation not matching password', async () => {
        userEvent.type(screen.getByLabelText('Signup:passwordConfirmation'), '3');
        userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
        expect(screen.getByLabelText('common:password')).toHaveValue('test12');
        expect(screen.getByLabelText('Signup:passwordConfirmation')).toHaveValue('test123');
        expect(await screen.findByText('Signup:passwordConfirmationError')).toBeVisible();
      });
      test('Error message on invalid email', async () => {
        const emailInput = screen.getByLabelText('common:email');
        emailInput.setSelectionRange(10, 13);
        userEvent.type(emailInput, '{backspace}');
        userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
        expect(emailInput).toHaveValue('test@test.');
        expect(await screen.findByText('common:emailError')).toBeVisible();
      });
    });
  });
  describe('Form with valid input', () => {
    const STATUS_OK = 200;
    const STATUS_ERROR = 422;
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    const server = setupServer(
      rest.post('https://books-training-rails.herokuapp.com/api/v1/users', (req, res, ctx) =>
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
      userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
      await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith('/login'));
    });

    test('Submit failed', async () => {
      server.use(
        rest.post('https://books-training-rails.herokuapp.com/api/v1/users', (req, res, ctx) =>
          res(ctx.status(STATUS_ERROR), ctx.json({ response: { data: { ok: false } } }))
        )
      );
      userEvent.click(screen.getByRole('button', { name: 'common:signup' }));
      expect(await screen.findByRole('button', { name: 'common:signup' })).toBeVisible();
      expect(await screen.findByText('Signup:submitError')).toBeVisible();
    });
  });
});
