import { configureStore, createSlice } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import productsSlice from "./ProductsSlice";

console.log("inside store");

const encodedToken =
  localStorage.getItem("encodedToken") ??
  sessionStorage.getItem("encodedToken");
const eCommerceLoggedIn =
  localStorage.getItem("eCommerceLoggedIn") ??
  sessionStorage.getItem("eCommerceLoggedIn");

const authSlice = createSlice({
  name: "auth",
  initialState: { encodedToken, eCommerceLoggedIn },
});

const Store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default Store;
