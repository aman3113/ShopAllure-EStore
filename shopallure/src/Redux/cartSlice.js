import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const CartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    getCartData: (state) => {},
  },
});

export const { getCartData } = CartSlice.actions;

export default CartSlice;
