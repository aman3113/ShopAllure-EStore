import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../Images/ShopAllure.png";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../api";
import { setProducts } from "../Redux/ProductsSlice";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const { eCommerceLoggedIn } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const data = await getProducts();
      dispatch(setProducts(data.products));
    }
    getData();
  }, []);

  function handleClick() {
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("eCommerceLoggedIn");
    sessionStorage.removeItem("encodedToken");
    sessionStorage.removeItem("eCommerceLoggedIn");
    window.location.reload();
  }
  return (
    <header className="flex  border-2 border-green-500 items-center">
      {openModal && (
        <div className="absolute top-0 bottom-0 left-0 right-0 border-2 bg-blue-50 opacity-80">
          <div className="flex flex-col ">
            <RxCross2 className="ml-auto" onClick={() => setOpenModal(false)} />
            <NavLink>{eCommerceLoggedIn ? "LOG OUT" : "LOG IN"}</NavLink>
            <NavLink>BUY-CLOTHES</NavLink>
            <NavLink>MEN</NavLink>
            <NavLink>WOMEN</NavLink>
            <NavLink>KIDS</NavLink>
          </div>
        </div>
      )}

      <div className="md:flex gap-2 hidden ">
        <NavLink to="/clothes">BUY-CLOTHES</NavLink>
        <NavLink to="/men">MEN</NavLink>
        <NavLink to="women">WOMEN</NavLink>
        <NavLink to="kids">KIDS</NavLink>
      </div>
      <figure className=" md:ml-auto mr-auto">
        <Link to="/">
          <img src={logo} className="w-[200px]" alt="" />
        </Link>
      </figure>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden md:flex items-center gap-4">
          {eCommerceLoggedIn ? (
            <button onClick={handleClick}>LOG OUT</button>
          ) : (
            <NavLink to="/login">LOG IN</NavLink>
          )}

          <Link to="/wishlist">
            <MdOutlineFavoriteBorder size={25} />
          </Link>
          <Link to="/cart">
            <MdOutlineShoppingCart size={25} />
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
