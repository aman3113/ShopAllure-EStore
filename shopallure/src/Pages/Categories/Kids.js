import React from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";

const Kids = () => {
  const products = useSelector((store) => store.products.value);
  const kidsProducts = products.filter(
    (product) => product.category === "Kids"
  );
  return (
    <div>
      <div className="flex justify-center border-2 p-6">
        <div className="flex flex-wrap gap-5 border-2   ">
          {kidsProducts.map((product) => (
            <SingleItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kids;
