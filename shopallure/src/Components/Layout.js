import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

import BarLoader from "react-spinners/BarLoader";
import { useSelector } from "react-redux";

const Layout = () => {
  const loading = useSelector((store) => store.spinner.value);
  return (
    <div className="  py-5 px-1 relative md:p-5">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
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
