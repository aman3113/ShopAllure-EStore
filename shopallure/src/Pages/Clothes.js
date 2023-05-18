import React from "react";
import { useSelector } from "react-redux";

const Clothes = () => {
  const products = useSelector((store) => store.products);
  return <div>Clothes</div>;
};

export default Clothes;
