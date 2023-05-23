import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { value: [] },
  reducers: {
    handleCartItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleCartItem } = cartSlice.actions;
export default cartSlice;
