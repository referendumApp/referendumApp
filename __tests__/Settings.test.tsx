import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';
import { mockLogin, mockLogout, mockReduxState } from '../jest.constants';

jest.mock('@/navigation', () => {
  const SettingsScreen = require('../src/screens/Settings').default;
  return function MockSettingsScreen() {
    return <SettingsScreen />;
  };
});

describe('Settings', () => {
  it('Check that the Settings Screen is rendered', async () => {
    mockLogin();

    render(<App />);
    expect(screen.getByText('Settings')).toBeOnTheScreen();
    expect(screen.getByText('Account')).toBeOnTheScreen();
    expect(screen.getByText('Support')).toBeOnTheScreen();

    const logoutButton = screen.getByText('Log Out');
    fireEvent.press(logoutButton);

    mockLogout();

    await waitFor(
      () => {
        expect(mockReduxState().auth.isLoggedIn).toBe(false);
      },
      { timeout: 1000 },
    );
  });
});
