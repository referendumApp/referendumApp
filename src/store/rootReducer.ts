import { combineReducers } from '@reduxjs/toolkit';

import billsReducer from '@/screens/BillDetail/duck';
import feedReducer from '@/screens/Feed/duck';
import legislatorsReducer from '@/screens/LegislatorDetail/duck';
import authReducer from '@/screens/Login/duck';

import baseApi from './baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  bills: billsReducer,
  feed: feedReducer,
  legislators: legislatorsReducer,
});

export default rootReducer;
