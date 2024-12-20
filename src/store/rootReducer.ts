import { combineReducers } from '@reduxjs/toolkit';

import billsReducer from '@/screens/BillDetail/redux/duck';
import feedReducer from '@/screens/Feed/duck';
import legislatorsReducer from '@/screens/LegislatorDetail/redux/duck';
import authReducer from '@/screens/Login/redux/duck';

import baseApi from './baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  bills: billsReducer,
  feed: feedReducer,
  legislators: legislatorsReducer,
});

export default rootReducer;
