import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    array: [],
    filteredArray: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.array = action.payload;
    },
    setFilteredArray: (state, action) => {
      state.filteredArray = action.payload;
    },
  },
});

export const { setProducts, setFilteredArray } = productsSlice.actions;
export default productsSlice;
