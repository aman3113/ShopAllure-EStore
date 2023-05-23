import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { value: [] },
  reducers: {
    handleWishlistItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { handleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice;
