import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Bill } from '@/appTypes';

interface CatalogState {
  bills: Bill[];
}

const initialState: CatalogState = {
  bills: [],
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
  },
});

export const { setBills } = catalogSlice.actions;
export default catalogSlice.reducer;
