import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { handleCartItem } from "../Redux/CartsSlice";
import { handleWishlistItem } from "../Redux/WishlistSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { toast } from "react-toastify";

export async function loader({ params }) {
  const productId = params.productId;
  try {
    const resp = await fetch(`/api/products/${productId}`);
    const data = await resp.json();
    return data.product;
  } catch (err) {
    console.log(err);
  }
}

const SingleItemPage = () => {
  const product = useLoaderData();
  const {
    _id,
    title,
    image,
    trending,
    reviews,
    description,
    rating,
    size,
    original_price,
    price,
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
    if (resp.ok) {
      if (path === "cart") {
        dispatch(handleCartItem(data.cart));
        toast.success(" Item Added to cart");
      } else {
        dispatch(handleWishlistItem(data.wishlist));
        toast.success(" Item Added to wishlist");
      }
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
      toast.warn(" Item removed from wishlist");
    }
  }

  return (
    <div className="w-full min-h-[70vh] flex justify-center items-center p-5">
      <div className="w-[80%] sm:w-[60%] flex flex-col sm:flex-row items-center gap-4 px-3 py-2  bg-purple-50 rounded-md shadow-sm shadow-gray-400">
        <div className="w-[60%] md:w-[50%] relative ">
          <div className="absolute top-1 right-1">
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
          <img
            className="w-full border border-black rounded-sm "
            src={image}
            alt="product"
          />
        </div>
        <div className="p-2">
          <div>
            <p className="font-bold text-lg my-2">{title}</p>
            <span className="font-semibold text-sm  flex gap-1 items-center">
              {rating}
              <BsStarFill className="text-yellow-300" size={15} />
            </span>
          </div>
          <p className="my-2 font-semibold text-purple-600">{description}</p>
          <p className="mb-3">
            <span className="font-semibold">Rs.{price}</span>{" "}
            <span className="text-slate-400 text-sm line-through">
              {original_price}
            </span>
            <span className="text-green-800 font-bold text-lg ml-7">
              ({Math.round(((original_price - price) / original_price) * 100)}%
              off)
            </span>
          </p>
          <table>
            <tr>
              <td className="font-bold">Size</td>
              <td className="px-2">{size}</td>
            </tr>
            <tr>
              <td className="font-bold">Reviews</td>
              <td className="px-2">{reviews}</td>
            </tr>
          </table>

          {trending && (
            <p className="my-2 text-purple-900 font-semibold">Trending Item</p>
          )}

          {itemInCart ? (
            <button
              className="w-full p-1 bg-green-400 text-white font-semibold mt-4"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          ) : (
            <button
              className="w-full p-1 bg-blue-500 text-white font-semibold mt-4"
              onClick={() => {
                eCommerceLoggedIn
                  ? handleAddToCartWishList(product, "cart")
                  : navigate(
                      `/login?message="Login before adding items to cart`
                    );
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItemPage;
