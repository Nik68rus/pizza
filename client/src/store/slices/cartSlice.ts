import { IInCartItem, IToCartItem } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  items: IInCartItem[];
  totalPrice: number;
  totalQty: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQty: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IToCartItem>) => {
      const indexInCart = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexInCart < 0) {
        state.items.push({ ...action.payload, qty: 1 });
      } else {
        state.items[indexInCart].qty++;
      }
      state.totalPrice += action.payload.price;
      state.totalQty++;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const indexInCart = state.items.findIndex(
        (item) => item.id === action.payload
      );

      state.totalQty--;
      state.totalPrice -= state.items[indexInCart].price;

      if (state.items[indexInCart].qty > 1) {
        state.items[indexInCart].qty--;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    deletePosition: (state, action: PayloadAction<string>) => {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload
      )!;
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice -= itemInCart.qty * itemInCart.price;
      state.totalQty -= itemInCart.qty;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQty = 0;
    },
  },
});

export const { addItem, removeItem, resetCart, deletePosition } =
  cartSlice.actions;

export default cartSlice.reducer;
