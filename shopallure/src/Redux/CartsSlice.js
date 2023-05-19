import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    getFromCart: (state, action) => {
      state.value = action.payload;
    },
    addToCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getFromCart, addToCart } = cartSlice.actions;
export default cartSlice;
