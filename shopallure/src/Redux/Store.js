import { configureStore, createSlice } from "@reduxjs/toolkit";

import productsSlice from "./ProductsSlice";
import cartSlice from "./CartsSlice";
import wishlistSlice from "./WishlistSlice";

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
    wishlist: wishlistSlice.reducer,
  },
});

export default Store;
