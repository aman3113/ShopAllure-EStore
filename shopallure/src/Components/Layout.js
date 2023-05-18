import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Provider } from "react-redux";
import Store from "../Redux/Store";

const Layout = () => {
  return (
    <Provider store={Store}>
      <div className="border-2 border-red-600  py-5 px-1 relative  md:p-5">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;
