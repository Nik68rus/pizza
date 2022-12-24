import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PageState {
  currentPage: number;
  limit: number;
}

const initialState: PageState = {
  currentPage: 1,
  limit: 0,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setLimit, setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;
