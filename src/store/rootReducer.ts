import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '@/screens/auth/duck';
import billsReducer from '@/screens/bill/duck';
import feedReducer from '@/screens/feed/duck';
import legislatorsReducer from '@/screens/legislator/duck';

import baseApi from './baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  bills: billsReducer,
  feed: feedReducer,
  legislators: legislatorsReducer,
});

export default rootReducer;
