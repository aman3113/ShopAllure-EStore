import React, { useEffect, useState } from "react";
import { getCartData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { handleCartItem } from "../Redux/CartsSlice";
import CartItem from "../Components/CartItem";

const Cart = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.value);

  const totalPrice = cartItems?.reduce(
    (acc, curr) => (acc += curr.price * curr.qty),
    0
  );
  const originalPrice = cartItems?.reduce(
    (acc, curr) => (acc += curr.original_price * curr.qty),
    0
  );

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
      {cartItems?.length === 0 ? (
        <p className="w-full h-[70vh]  flex text-xl font-bold justify-center items-center p-8">
          There are no items in your Cart.
        </p>
      ) : (
        <div className="flex flex-col gap-5 h-[75vh] md:flex-row  border-2 border-yellow-300 items-center sm:items-start justify-center p-4 ">
          <div className="overflow-y-auto max-h-full">
            <table className="table-auto border-2 border-black border-spacing-2 border-separate">
              <thead>
                <tr className="border-y-2 border-black">
                  <th className="cell">Product</th>
                  <th className="cell">Price</th>
                  <th>Discount</th>
                  <th className="cell">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <CartItem product={item} key={item._id} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-[70%] sm:w-[40%] border-2 border-green-700 p-2  ">
            <p className="font-bold text-center">Cart Summary</p>
            {/* {cartItems?.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span className="font-semibold">
                  {item.title}({item.qty})
                </span>
                <span>Rs. {item.price}</span>
              </div>
            ))} */}
            <div className="flex justify-between">
              <span className="font-bold">
                Price ({cartItems.length} items):{" "}
              </span>
              <span>Rs. {originalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold"> Discount: </span>
              <span>Rs. {originalPrice - totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Delivery: </span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Total Amount: </span>
              <span>Rs. {totalPrice}</span>
            </div>
            <button className="w-full bg-green-400 text-white font-bold p-1">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
