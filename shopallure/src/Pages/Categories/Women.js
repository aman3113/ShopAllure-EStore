import React from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";

const Women = () => {
  const products = useSelector((store) => store.products.value);
  const womenProducts = products.filter(
    (product) => product.category === "Women"
  );
  return (
    <div className="flex justify-center border-2 p-6">
      <div className="flex flex-wrap gap-5">
        {womenProducts.map((product) => (
          <SingleItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Women;
