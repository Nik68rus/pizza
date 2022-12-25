import { RootState } from './../index';
import { getPizzas, getPizzaById } from './../../http/pizzaAPI';
import { getCategories } from './../../http/categoryAPI';
import {
  ICategory,
  IPizza,
  TStatus,
  PizzaFetchParams,
} from './../../types/index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ALL_CAT } from '../../helpers/constants';

export const fetchCategories = createAsyncThunk(
  'pizza/fetchCategoriesStatus',
  async () => {
    return await getCategories();
  }
);

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: PizzaFetchParams) => {
    return await getPizzas(params);
  }
);

export const fetchPizzaById = createAsyncThunk(
  'pizza/fetchPizzaByIdStatus',
  async (id: number) => {
    return await getPizzaById(id);
  }
);

export interface PizzaState {
  categories: ICategory[];
  catLoading: TStatus;
  pizzas: IPizza[];
  pizzaLoading: TStatus;
  totalCount: number;
  active: IPizza | null;
}

const initialState: PizzaState = {
  categories: [ALL_CAT],
  catLoading: 'loading',
  pizzas: [],
  pizzaLoading: 'loading',
  totalCount: 0,
  active: null,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    resetActiveState: (state) => {
      state.active = null;
      state.pizzaLoading = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.catLoading = 'loading';
      state.categories = [ALL_CAT];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.catLoading = 'success';
      state.categories = [ALL_CAT, ...action.payload];
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.catLoading = 'failed';
      state.categories = [ALL_CAT];
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzaLoading = 'loading';
      state.pizzas = [];
      state.totalCount = 0;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzaLoading = 'success';
      state.pizzas = action.payload.rows;
      state.totalCount = action.payload.count;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzaLoading = 'failed';
      state.pizzas = [];
      state.totalCount = 0;
    });
    builder.addCase(fetchPizzaById.pending, (state) => {
      state.pizzaLoading = 'loading';
      state.active = null;
    });
    builder.addCase(fetchPizzaById.fulfilled, (state, action) => {
      state.pizzaLoading = 'success';
      state.active = action.payload;
    });
    builder.addCase(fetchPizzaById.rejected, (state) => {
      state.pizzaLoading = 'failed';
      state.active = null;
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const selectPizzaLoading = (state: RootState) =>
  state.pizza.pizzaLoading;
export const selectActivePizza = (state: RootState) => state.pizza.active;
export const selectCategories = (state: RootState) => state.pizza.categories;
export const selectCatLoading = (state: RootState) => state.pizza.catLoading;
export const selectTotalCount = (state: RootState) => state.pizza.totalCount;

export const { resetActiveState } = pizzaSlice.actions;

export default pizzaSlice.reducer;
