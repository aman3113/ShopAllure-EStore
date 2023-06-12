import { configureStore, createSlice } from "@reduxjs/toolkit";

import productsSlice from "./ProductsSlice";
import cartSlice from "./CartsSlice";
import wishlistSlice from "./WishlistSlice";
import userSlice from "./UserSlice";

const encodedToken =
  localStorage.getItem("encodedToken") ??
  sessionStorage.getItem("encodedToken");
const eCommerceLoggedIn =
  localStorage.getItem("eCommerceLoggedIn") ??
  sessionStorage.getItem("eCommerceLoggedIn");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    encodedToken: encodedToken ?? "",
    eCommerceLoggedIn: eCommerceLoggedIn ?? false,
  },
  reducers: {
    handleAuth: (state) => {
      const encodedToken =
        localStorage.getItem("encodedToken") ??
        sessionStorage.getItem("encodedToken");
      const eCommerceLoggedIn =
        localStorage.getItem("eCommerceLoggedIn") ??
        sessionStorage.getItem("eCommerceLoggedIn");

      state.eCommerceLoggedIn = eCommerceLoggedIn;
      state.encodedToken = encodedToken;
    },
  },
});

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: {
    value: false,
  },
  reducers: {
    toggleSpinner: (state) => {
      state.value = !state.value;
    },
  },
});

const Store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    wishlist: wishlistSlice.reducer,
    user: userSlice.reducer,
    spinner: spinnerSlice.reducer,
  },
});

export const { toggleSpinner } = spinnerSlice.actions;
export const { handleAuth } = authSlice.actions;
export default Store;
