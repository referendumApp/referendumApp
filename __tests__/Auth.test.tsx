import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';
import { mockSignUp } from '../jest.constants';
import { mockNavigate } from '../jest.setup';

jest.mock('@/navigation', () => {
  const SignUpScreen = require('../src/screens/SignUp').default;
  return function MockSignUpScreen() {
    const mockRoute = {
      params: {
        previousScreen: 'Welcome',
      },
    };

    return <SignUpScreen route={mockRoute} />;
  };
});

describe('SignUp', () => {
  it('Navigate to SignUpScreen and Create Account', async () => {
    render(<App />);
    expect(screen.getByText('Create Account')).toBeOnTheScreen();

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    fireEvent.changeText(nameInput, 'Tester');
    fireEvent.changeText(emailInput, 'tester');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.changeText(confirmPasswordInput, 'password');

    const signUpButton = screen.getByText('Continue');
    fireEvent.press(signUpButton);

    expect(mockSignUp).toHaveBeenCalledWith({
      name: 'Tester',
      email: 'tester',
      password: 'password',
    });

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith('Login', { previousScreen: 'SignUp' });
      },
      { timeout: 1000 },
    );
  });
});
