import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import pageSlice from './slices/pageSlice';
import pizzaSlice from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    page: pageSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
