import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill, Legislator } from '@/appTypes';

interface FeedState {
  bills: Bill[];
  legislators: Legislator[];
}

const initialState: FeedState = {
  bills: [],
  legislators: [],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setUserBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    setUserLegislators: (state, action: PayloadAction<Legislator[]>) => {
      state.legislators = action.payload;
    },
  },
});

export const { setUserBills, setUserLegislators } = feedSlice.actions;
export default feedSlice.reducer;

