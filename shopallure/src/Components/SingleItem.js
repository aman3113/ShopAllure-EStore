import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/CartsSlice";

const SingleItem = ({ product }) => {
  const {
    _id,
    title,
    image,
    category,
    trending,
    reviews,
    in_stock,
    original_price,
  } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.value);
  const { encodedToken } = useSelector((store) => store.auth);
  const itemInCart = cartItems?.find((item) => item._id === _id);

  async function handleAddToCart(product) {
    const resp = await fetch(`/api/user/cart`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
      body: JSON.stringify({ product }),
    });
    const data = await resp.json();
    dispatch(addToCart(data.cart));
  }

  return (
    <div className=" w-[40vw] sm:w-[30vw] lg:w-[20vw] p-2 hover:translate-y-1 shadow shadow-black ">
      <div className="w-full ">
        <img className="w-ful h-full" src={image} alt="product" />
      </div>
      <div>
        <p>{title}</p>
        <p>Price: Rs.{original_price}</p>
        {itemInCart ? (
          <button onClick={() => navigate("/cart")}>Go to Cart</button>
        ) : (
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
