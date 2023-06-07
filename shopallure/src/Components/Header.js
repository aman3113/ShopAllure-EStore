import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../Images/ShopAllure.png";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/ProductsSlice";
import { getProducts } from "../api";
import { toggleSpinner } from "../Redux/Store";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const cartArray = useSelector((store) => store.cart.value);
  const wishlistArray = useSelector((store) => store.wishlist.value);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      dispatch(toggleSpinner());
      const data = await getProducts();
      dispatch(toggleSpinner());

      dispatch(setProducts(data.products));
    }
    getData();
  }, []);

  return (
    <header className="flex items-center border-b px-2 shadow-md shadow-purple-300">
      {openModal && (
        <div className="absolute top-0 bottom-0 left-0 right-0 border-2 bg-blue-50 opacity-100">
          <div className="flex flex-col ">
            <RxCross2 className="ml-auto" onClick={() => setOpenModal(false)} />

            <NavLink>BUY-CLOTHES</NavLink>
            <NavLink>MEN</NavLink>
            <NavLink>WOMEN</NavLink>
            <NavLink>KIDS</NavLink>
          </div>
        </div>
      )}

      <div className="md:flex gap-3 hidden ">
        <NavLink
          style={({ isActive }) => ({
            color: `${isActive ? "purple" : "black"}`,
            fontWeight: `${isActive ? "500" : ""}`,
          })}
          to="/clothes"
        >
          BUY-CLOTHES
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: `${isActive ? "purple" : "black"}`,
            fontWeight: `${isActive ? "500" : ""}`,
          })}
          to="/men"
        >
          MEN
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: `${isActive ? "purple" : "black"}`,
            fontWeight: `${isActive ? "500" : ""}`,
          })}
          to="women"
        >
          WOMEN
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: `${isActive ? "purple" : "black"}`,
            fontWeight: `${isActive ? "500" : ""}`,
          })}
          to="kids"
        >
          KIDS
        </NavLink>
      </div>
      <figure className=" md:ml-auto mr-auto">
        <Link to="/">
          <img src={logo} className="w-[200px]" alt="" />
        </Link>
      </figure>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden md:flex items-center gap-4">
          <Link to="/user">
            <BiUserCircle size={25} />
          </Link>

          <Link to="/wishlist" className="relative">
            <MdOutlineFavoriteBorder size={25} />
            {wishlistArray.length > 0 && (
              <div className="rounded-[50%] p-1 w-4 h-4 absolute top-[-6px] right-[-5px] bg-purple-400 flex items-center justify-center">
                <p className="text-xs">{wishlistArray.length}</p>
              </div>
            )}
          </Link>
          <Link to="/cart" className="relative">
            <MdOutlineShoppingCart size={25} />
            {cartArray.length > 0 && (
              <div className="rounded-[50%] p-1 w-4 h-4 absolute top-[-6px] right-[-5px] bg-purple-400 flex items-center justify-center">
                <p className="text-xs">{cartArray.length}</p>
              </div>
            )}
          </Link>
        </div>

        <div className="md:hidden">
          <RxHamburgerMenu onClick={() => setOpenModal(true)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
