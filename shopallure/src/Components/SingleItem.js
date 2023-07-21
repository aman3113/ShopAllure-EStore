import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons//ai";
import { BsStarFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { handleCartItem } from "../Redux/CartsSlice";
import { handleWishlistItem } from "../Redux/WishlistSlice";

const SingleItem = ({ product }) => {
	const { _id, title, image, rating, in_stock, original_price, price } =
		product;
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
			toast.info(" Item removed from wishlist");
		}
	}

	return (
		<div
			className={` w-[60vw] sm:w-[35vw] md:w-[25vw] lg:w-[20vw] min-w-[200px] p-2 hover:translate-y-1 bg-purple-50 rounded-md shadow-sm shadow-gray-400 relative`}
		>
			{!in_stock && (
				<div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-400 bg-opacity-50 text-white z-10 flex justify-center items-center text-2xl font-bold ">
					<p className="-rotate-45">Out Of Stock</p>
				</div>
			)}
			<div className="w-full relative ">
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
				<Link to={`/item/${_id}`}>
					<img
						className="w-[80%] border border-black rounded-sm "
						src={image}
						alt="product"
					/>
				</Link>
			</div>
			<div className="p-2">
				<div className="flex justify-between">
					<span className="font-semibold my-2">{title}</span>
					<span className="font-semibold text-sm  flex gap-1 items-center">
						{rating}
						<BsStarFill className="text-yellow-300" size={15} />
					</span>
				</div>

				<p className="mb-3">
					<span className="font-semibold">Rs.{price}</span>{" "}
					<span className="text-slate-400 text-sm line-through">
						{original_price}
					</span>
					<span className="text-green-800 font-semibold ml-7">
						({Math.round(((original_price - price) / original_price) * 100)}%
						off)
					</span>
				</p>
				{itemInCart ? (
					<button
						className="w-full p-1 bg-green-400 text-white font-semibold"
						onClick={() => navigate("/cart")}
					>
						Go to Cart
					</button>
				) : (
					<button
						className="w-full p-1 bg-blue-500 text-white font-semibold"
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
