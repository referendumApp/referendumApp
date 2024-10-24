import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/duck';
import catalogReducer from '@/features/catalog/duck';

import baseApi from './baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  catalog: catalogReducer,
});

export default rootReducer;
