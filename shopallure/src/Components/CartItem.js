import React from "react";

import { BiPlusCircle } from "react-icons/bi";
import { BiMinusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { handleCartItem } from "../Redux/CartsSlice";
import { toast } from "react-toastify";

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
      toast.info(" Item removed from cart");
    }
  }

  return (
    <>
      <tr className="border-y-2 border-black ">
        <td className="cell">
          <div className="flex items-center gap-2">
            <img
              src={image}
              alt=""
              className="w-[100px] h-[100px] hidden sm:block"
            />
            <p>{title}</p>
          </div>
        </td>
        <td className="cell"> Rs.{original_price}</td>
        <td>
          {Math.round(((original_price - price) / original_price) * 100)}% off
        </td>
        <td className="cell">
          <div className="flex items-center">
            <button
              className="border border-gray-500  px-2"
              onClick={() => {
                qty > 1
                  ? handleItemIncrementDecrement(_id, "decrement")
                  : deleteFromCart(_id);
              }}
            >
              -
            </button>
            <span className="border border-gray-500  px-2">{qty}</span>
            <button
              className="border border-gray-500  px-2"
              onClick={() => handleItemIncrementDecrement(_id, "increment")}
            >
              +
            </button>
          </div>
        </td>
        <td className="cell">
          {" "}
          <button onClick={() => deleteFromCart(_id)} className="text-lg">
            ×
          </button>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
