import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { eCommerceLoggedIn } = useSelector((store) => store.auth);
  if (!eCommerceLoggedIn) {
    return <Navigate to={"/login"} />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
