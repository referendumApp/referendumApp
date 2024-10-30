// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// import { Bill, Legislator } from '@/appTypes';
//
// interface CatalogState {
//   bills: Bill[];
//   legislators: Legislator[];
// }
//
// const initialState: CatalogState = {
//   bills: [],
//   legislators: [],
// };
//
// const catalogSlice = createSlice({
//   name: 'catalog',
//   initialState,
//   reducers: {
//     setBills: (state, action: PayloadAction<Bill[]>) => {
//       state.bills = action.payload;
//     },
//     setLegislators: (state, action: PayloadAction<Legislator[]>) => {
//       state.legislators = action.payload;
//     },
//   },
// });
//
// export const { setBills, setLegislators } = catalogSlice.actions;
// export default catalogSlice.reducer;
