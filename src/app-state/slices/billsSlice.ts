import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill } from '@types';

interface BillsState {
  bills: Bill[];
}

const initialState: BillsState = {
  bills: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
  },
});

export const { getBills } = authSlice.actions;
export default authSlice.reducer;
