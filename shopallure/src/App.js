import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Components/Layout";
import Clothes from "./Pages/Clothes";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Login from "./Pages/Auth/Login";
import { action as LoginAction } from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import { action as SignUpAction } from "./Pages/Auth/SignUp";

import MockAPI from "./Mockman";
import ErrorElement from "./Pages/ErrorElement";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorElement />}>
        <Route index={true} element={<Home />} />
        <Route path="clothes" element={<Clothes />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="kids" element={<Kids />} />
        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} action={LoginAction} />
        <Route path="sign-up" element={<SignUp />} action={SignUpAction} />
        <Route path="/mockapi" element={<MockAPI />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
