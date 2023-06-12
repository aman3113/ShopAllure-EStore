import React, { useEffect, useState } from "react";
import { getCartData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { handleCartItem } from "../Redux/CartsSlice";
import CartItem from "../Components/CartItem";
import { Link } from "react-router-dom";

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
    <div className="px-2">
      {cartItems?.length === 0 ? (
        <p className="w-full h-[70vh]  flex text-xl font-bold text-purple-700 justify-center items-center p-8">
          There are no items in your Cart.
        </p>
      ) : (
        <div className=" min-h-[75vh] flex flex-col gap-5 lg:h-[75vh] lg:flex-row  items-center lg:items-start justify-center p-4 ">
          <div className="text-xl font-bold lg:hidden">Product Summary</div>
          <div className=" overflow-y-auto max-h-full border-1  border-black shadow-md shadow-purple-400">
            <table className="table-auto py-2  border-spacing-0 sm:border-spacing-2 border-separate text-sm sm:text-base">
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

          <div className="w-[70%] sm:w-[40%] border-1  border-black shadow-md shadow-purple-400 p-3  ">
            <p className="font-bold text-center text-xl mb-3">Cart Summary</p>
            <div className="flex justify-between">
              <span className="font-bold">
                Price ({cartItems.length} items):{" "}
              </span>
              <span className="text-sm">Rs. {originalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold"> Discount: </span>
              <span className="text-sm">
                - Rs. {originalPrice - totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Delivery: </span>
              <span className="text-sm">FREE</span>
            </div>
            <div className="flex justify-between border-black mt-2 border-t">
              <span className="font-bold">Total Amount: </span>
              <span className="text-sm">Rs. {totalPrice}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full block text-center bg-green-400 text-white font-bold p-1 mt-3"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
