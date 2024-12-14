import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';
import { mockLogin, mockReduxState } from '../jest.constants';

jest.mock('@/navigation', () => {
  const LoginScreen = require('../src/screens/Login').default;
  return function MockLoginScreen() {
    const mockRoute = {
      params: {
        previousScreen: 'Welcome',
      },
    };

    return <LoginScreen route={mockRoute} />;
  };
});

describe('Login', () => {
  it('Navigate to LoginScreen and login', async () => {
    render(<App />);
    expect(screen.getByText('Welcome to Referendum')).toBeOnTheScreen();

    const usernameInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.changeText(usernameInput, 'tester');
    fireEvent.changeText(passwordInput, 'password');

    const loginButton = screen.getByText('Continue');
    fireEvent.press(loginButton);
    expect(mockLogin).toHaveBeenCalledWith({ username: 'tester', password: 'password' });

    await waitFor(
      () => {
        expect(mockReduxState().auth.isLoggedIn).toBe(true);
      },
      { timeout: 1000 },
    );
  });
});
