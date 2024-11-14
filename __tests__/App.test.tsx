import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react-native';

import App from '../App';
import store from '../src/store';

jest.mock('@/screens/Login/api', () => ({
  useGetUserSessionMutation: () => [
    jest.fn().mockResolvedValue({ accessToken: 'test', tokenType: 'bearer', username: 'tester' }),
    { isLoading: false },
  ],
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('App and Login Page Renders', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText('Welcome to Referendum')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Email')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Password')).toBeOnTheScreen();
    expect(screen.getByText('Log In')).toBeOnTheScreen();
  });
});
