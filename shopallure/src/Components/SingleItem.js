import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons//ai";

import { handleCartItem } from "../Redux/CartsSlice";
import { handleWishlistItem } from "../Redux/WishlistSlice";

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
  const wishlistItems = useSelector((store) => store.wishlist.value);

  const { encodedToken, eCommerceLoggedIn } = useSelector(
    (store) => store.auth
  );
  const itemInCart = cartItems?.find((item) => item._id === _id);
  const itemInWishlist = wishlistItems?.find((item) => item._id === _id);

  async function handleAddToCartWishList(product, path) {
    const resp = await fetch(`/api/user/${path}`, {
      method: "POST",
      headers: {
        authorization: encodedToken,
      },
      body: JSON.stringify({ product }),
    });
    const data = await resp.json();
    console.log(data);
    if (resp.ok) {
      path === "cart"
        ? dispatch(handleCartItem(data.cart))
        : dispatch(handleWishlistItem(data.wishlist));
    }
  }

  async function deleteFromWishList(productId) {
    const resp = await fetch(`/api/user/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: encodedToken,
      },
    });
    const data = await resp.json();
    if (resp.ok) {
      dispatch(handleWishlistItem(data.wishlist));
    }
  }

  return (
    <div className=" w-[70vw] sm:w-[35vw] lg:w-[20vw] p-2 hover:translate-y-1 shadow shadow-black ">
      <div className="w-full relative ">
        <div className="absolute top-0 right-0">
          {itemInWishlist ? (
            <button onClick={() => deleteFromWishList(_id)}>
              <AiFillHeart className="text-red-600" size={20} />
            </button>
          ) : (
            <button
              onClick={() => {
                eCommerceLoggedIn
                  ? handleAddToCartWishList(product, "wishlist")
                  : navigate(
                      `/login?message="Login before adding items to wishlist`
                    );
              }}
            >
              <AiOutlineHeart size={20} />
            </button>
          )}
        </div>
        <img className="w-ful h-full" src={image} alt="product" />
      </div>
      <div>
        <p>{title}</p>
        <p>Price: Rs.{original_price}</p>
        {itemInCart ? (
          <button onClick={() => navigate("/cart")}>Go to Cart</button>
        ) : (
          <button
            onClick={() => {
              eCommerceLoggedIn
                ? handleAddToCartWishList(product, "cart")
                : navigate(`/login?message="Login before adding items to cart`);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
