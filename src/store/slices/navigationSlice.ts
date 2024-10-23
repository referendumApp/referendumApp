import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentScreen: string;
}

const initialState: NavigationState = {
  currentScreen: 'Feed',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { navigateTo } = navigationSlice.actions;
export default navigationSlice.reducer;
