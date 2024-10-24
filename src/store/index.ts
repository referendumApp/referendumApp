import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

import { configureStore } from '@reduxjs/toolkit';

import baseApi from './baseApi';
import rootReducer from './rootReducer';
import { getMiddlewareOptions } from './utils';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(getMiddlewareOptions()).concat(baseApi.middleware),
  devTools: false,
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
