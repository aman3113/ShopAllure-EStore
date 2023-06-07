import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../api";
import { handleWishlistItem } from "../Redux/WishlistSlice";
import SingleItem from "../Components/SingleItem";

const Wishlist = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const wishListItems = useSelector((store) => store.wishlist.value);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCartData("wishlist");
        dispatch(handleWishlistItem(data.wishlist));
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, []);

  if (error) {
    return (
      <p className="w-full h-[70vh]  flex text-xl font-bold justify-center items-center p-8">
        {error.message ?? "There are no items in your WishList."}
      </p>
    );
  }

  return (
    <div className="min-h-[70vh] p-6">
      <p className="text-center font-bold text-2xl ">WishList Items</p>
      {wishListItems.length === 0 && (
        <p className="w-full h-[55vh]  flex text-xl font-bold text-purple-700 justify-center items-center p-8">
          There are no items in your Wish list
        </p>
      )}
      <div className="flex flex-wrap gap-5  p-4  ">
        {wishListItems?.map((item) => (
          <SingleItem product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
