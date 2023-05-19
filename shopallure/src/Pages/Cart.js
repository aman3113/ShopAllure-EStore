import React, { useEffect, useState } from "react";
import { getCartData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { getFromCart } from "../Redux/CartsSlice";

const Cart = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.value);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCartData("cart");
        console.log(data);
        dispatch(getFromCart(data.cart));
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  console.log(cartItems);

  return <div></div>;
};

export default Cart;
