import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../Images/ShopAllure.png";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className="flex  border-2 border-green-500 items-center">
      {openModal && (
        <div className="absolute top-0 bottom-0 left-0 right-0 border-2 bg-blue-50 opacity-80">
          <div className="flex flex-col ">
            <RxCross2 className="ml-auto" onClick={() => setOpenModal(false)} />
            <NavLink>LOG IN</NavLink>
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
        <MdOutlineFavoriteBorder />
        <MdOutlineShoppingCart />
        <div className="hidden md:block">
          <NavLink>LOG IN</NavLink>
        </div>

        <div className="md:hidden">
          <RxHamburgerMenu onClick={() => setOpenModal(true)} />
        </div>
      </div>
    </header>
  );
};

export default Header;
