import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pageSlice from './slices/pageSlice';
import pizzaSlice from './slices/pizzaSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    page: pageSlice,
    pizza: pizzaSlice,
    cart: cartSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
