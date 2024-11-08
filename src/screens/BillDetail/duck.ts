import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill } from '@/appTypes';

interface BillsState {
  list: Bill[];
}

const initialState: BillsState = {
  list: [],
};

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setBills } = billsSlice.actions;
export default billsSlice.reducer;
