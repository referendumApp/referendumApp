import React from 'react';

import App from '../App';

import { render, screen } from './test_utils';

jest.mock('expo-font', () => ({
  useFonts: () => [true],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);

    expect(screen.getByText('Welcome to Referendum')).toBeOnTheScreen();
  });
});
