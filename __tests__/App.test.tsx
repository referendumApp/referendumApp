import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react-native';

import App from '../App';
import baseApi from '../src/store/baseApi';
import rootReducer from '../src/store/rootReducer';
import { getMiddlewareOptions } from '../src/store/utils';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(getMiddlewareOptions()).concat(baseApi.middleware),
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(),
});

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
