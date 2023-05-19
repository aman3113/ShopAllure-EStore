import React from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";

const Clothes = () => {
  const products = useSelector((store) => store.products.value);
  return (
    <div className="flex justify-center border-2 p-6">
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <SingleItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Clothes;
