import { configureStore } from '@reduxjs/toolkit';

import baseApi from '../src/store/baseApi';
import rootReducer from '../src/store/rootReducer';
import { getMiddlewareOptions } from '../src/store/utils';

export const createTestStore = (overrides = {}) => {
  // Mock the API with default responses
  jest.mock('../src/store/baseApi', () => ({
    ...jest.requireActual('../src/store/baseApi'),
    useQuery: () => ({ data: null, isLoading: false }),
    useMutation: () => [() => {}, { isLoading: false }],
    ...overrides, // Allow overriding specific endpoints
  }));

  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware(getMiddlewareOptions()).concat(baseApi.middleware),
  });
};
