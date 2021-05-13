import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from './index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}));

const mockHistoryPush = jest.fn();
const mockRemoveKey = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({ push: mockHistoryPush })
}));

jest.mock('services/LocalStorageService', () => ({
  removeValue: (storageKey: string) => mockRemoveKey(storageKey)
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('Navbar renders correctly', () => {
    expect(screen.getByAltText('Wolox logo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'common:logout' })).toBeInTheDocument();
  });

  test('Session token removed and user redirect to login', () => {
    userEvent.click(screen.getByRole('button', { name: 'common:logout' }));
    expect(mockRemoveKey).toHaveBeenCalledWith('session');
    expect(mockHistoryPush).toHaveBeenCalledWith('/login');
  });
});
