import React from "react";

import { BiPlusCircle } from "react-icons/bi";
import { BiMinusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { handleCartItem } from "../Redux/CartsSlice";

const CartItem = ({ product }) => {
  const { _id, title, image, qty, original_price, price } = product;
  const { encodedToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  async function handleItemIncrementDecrement(productId, actionType) {
    const resp = await fetch(`/api/user/cart/${productId}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
      body: JSON.stringify({
        action: {
          type: actionType,
        },
      }),
    });

    const data = await resp.json();
    console.log(data);
    if (resp.ok) {
      dispatch(handleCartItem(data.cart));
    }
  }

  async function deleteFromCart(productId) {
    const resp = await fetch(`/api/user/cart/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
    });
    const data = await resp.json();
    if (resp.ok) {
      dispatch(handleCartItem(data.cart));
    }
  }

  return (
    <div className=" w-[40vw] sm:w-[30vw] lg:w-[20vw] p-2 hover:translate-y-1 shadow shadow-black ">
      <div>
        <img src={image} alt="" />
      </div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p>
          Rs.{price}
          <span className="line-through text-sm text-gray-500">
            Rs.{original_price}
          </span>
        </p>
        <p>
          {Math.round(((original_price - price) / original_price) * 100)}% off
        </p>
        <div className="flex gap-2 items-center">
          <span>Quantity: </span>
          <span className="flex gap-1 items-center">
            <button
              onClick={() => {
                qty > 1
                  ? handleItemIncrementDecrement(_id, "decrement")
                  : deleteFromCart(_id);
              }}
            >
              <BiMinusCircle size={20} />
            </button>
            <span>{qty}</span>
            <button
              onClick={() => handleItemIncrementDecrement(_id, "increment")}
            >
              <BiPlusCircle size={20} />
            </button>
          </span>
        </div>
        <button onClick={() => deleteFromCart(_id)}>Remove From cart</button>
      </div>
    </div>
  );
};

export default CartItem;
