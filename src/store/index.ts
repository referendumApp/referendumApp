import {configureStore} from '@reduxjs/toolkit';
import reactotron from '@configs/ReactotronConfig';
import rootReducer from './rootReducer';
import baseApi from './baseApi';
import {isDevEnv} from './utils';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware),
  enhancers: getDefaultEnhancers =>
    isDevEnv()
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
