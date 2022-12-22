import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PageState {
  totalPizzaCount: number;
  currentPage: number;
  limit: number;
}

const initialState: PageState = {
  totalPizzaCount: 0,
  currentPage: 1,
  limit: 0,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTotalPizzaCount: (state, action: PayloadAction<number>) => {
      state.totalPizzaCount = action.payload;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setTotalPizzaCount, setLimit, setCurrentPage } =
  pageSlice.actions;

export default pageSlice.reducer;
