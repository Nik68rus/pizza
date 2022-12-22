import { ALL_CAT, SORTINGS } from './../../helpers/constants';
import { ISorting, ICategory } from './../../types/index';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  sorting: ISorting;
  category: ICategory;
  searchTerm: string;
}

const initialState: FilterState = {
  sorting: SORTINGS[0],
  category: ALL_CAT,
  searchTerm: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
    setSorting: (state, action: PayloadAction<ISorting>) => {
      state.sorting = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setCategory, setSorting, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
