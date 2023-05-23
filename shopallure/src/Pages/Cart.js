import React, { useEffect, useState } from "react";
import { getCartData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { handleCartItem } from "../Redux/CartsSlice";
import CartItem from "../Components/CartItem";

const Cart = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.value);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCartData("cart");
        dispatch(handleCartItem(data.cart));
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, []);

  if (error) {
    return (
      <p className="w-full h-[70vh]  flex text-xl font-bold justify-center items-center p-8">
        {error.message ?? "There are no items in your Cart."}
      </p>
    );
  }

  return (
    <div>
      {cartItems?.length === 0 && (
        <p className="w-full h-[70vh]  flex text-xl font-bold justify-center items-center p-8">
          There are no items in your Cart.
        </p>
      )}
      <div className="flex justify-center border-2 p-6">
        <div className="flex flex-wrap gap-5">
          {cartItems?.map((item) => (
            <CartItem product={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
