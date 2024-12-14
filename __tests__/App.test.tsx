import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import App from '../App';
import { mockNavigate } from '../jest.setup';

jest.mock('@/navigation', () => {
  const WelcomeScreen = require('../src/screens/Welcome').default;
  return function AuthNavigator() {
    return <WelcomeScreen />;
  };
});

describe('App', () => {
  it('App, Welcome Page Renders, Navigate to Login Screen + Sign Up Screen', () => {
    render(<App />);

    expect(screen.getByText('Referendum')).toBeOnTheScreen();
    expect(screen.getByText('Login')).toBeOnTheScreen();
    expect(screen.getByText('Create Account')).toBeOnTheScreen();

    const loginButton = screen.getByText('Login');
    fireEvent.press(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith('Login', { previousScreen: 'Welcome' });

    const createButton = screen.getByText('Create Account');
    fireEvent.press(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });
});
