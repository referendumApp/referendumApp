import React from 'react';
import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react-native';

import App from '../App';
import store from '../src/store';

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('App', () => {
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(screen.getByText('Welcome to Referendum')).toBeOnTheScreen();
  });
});
