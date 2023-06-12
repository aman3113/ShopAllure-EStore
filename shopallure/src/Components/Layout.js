import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const loading = useSelector((store) => store.spinner.value);
  return (
    <div className="  py-5 px-1 relative md:p-5">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer autoClose={3000} />
      {loading && (
        <div className="absolute top-0 bottom-0 left-0 right-0  bg-purple-200 bg-opacity-80  ">
          <BarLoader
            color="blue"
            loading={loading}
            aria-label="Loading Spinner"
            className="absolute top-[45vh] left-[45vw]  "
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
