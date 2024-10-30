import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Legislator } from '@/appTypes';

interface LegislatorsState {
  list: Legislator[];
}

const initialState: LegislatorsState = {
  list: [],
};

const legislatorsSlice = createSlice({
  name: 'legislators',
  initialState,
  reducers: {
    setLegislators: (state, action: PayloadAction<Legislator[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setLegislators } = legislatorsSlice.actions;
export default legislatorsSlice.reducer;
