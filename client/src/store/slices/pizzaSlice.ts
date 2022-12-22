import { ICategory, IPizza } from './../../types/index';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ALL_CAT } from '../../helpers/constants';

export interface PizzaState {
  categories: ICategory[];
  catLoading: boolean;
  pizzas: IPizza[];
  pizzaLoading: boolean;
}

const initialState: PizzaState = {
  categories: [ALL_CAT],
  catLoading: true,
  pizzas: [],
  pizzaLoading: true,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },

    setCatLoading: (state, action: PayloadAction<boolean>) => {
      state.catLoading = action.payload;
    },

    setPizzas: (state, action: PayloadAction<IPizza[]>) => {
      state.pizzas = action.payload;
    },

    setPizzaLoading: (state, action: PayloadAction<boolean>) => {
      state.pizzaLoading = action.payload;
    },
  },
});

export const { setPizzas, setCategories, setPizzaLoading, setCatLoading } =
  pizzaSlice.actions;

export default pizzaSlice.reducer;
