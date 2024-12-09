import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill, BillDetail } from '@/appTypes';

interface BillsState {
  list: Bill[];
  detail: BillDetail[];
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
    setBillDetails: (state, action: PayloadAction<BillDetail[]>) => {
      state.detail = action.payload;
    },
  },
});

export const { setBills, setBillDetails } = billsSlice.actions;
export default billsSlice.reducer;
