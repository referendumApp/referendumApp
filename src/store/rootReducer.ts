import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/duck';
import billsReducer from '@/features/bill/duck';
import feedReducer from '@/features/feed/duck';
import legislatorsReducer from '@/features/legislator/duck';

import baseApi from './baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  bills: billsReducer,
  feed: feedReducer,
  legislators: legislatorsReducer,
});

export default rootReducer;
