import React from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";
import Navbar from "../../Components/Navbar";

const Men = () => {
  const products = useSelector((store) => store.products.array);
  const menProducts = products.filter((product) => product.category === "Men");
  const filteredProducts = useSelector((store) => store.products.filteredArray);

  return (
    <div>
      <Navbar itemArray={menProducts} />
      <div className="font-bold text-lg text-purple-800">
        Showing "{filteredProducts.length}" items
      </div>
      <div className="flex   p-6">
        <div className="flex flex-wrap gap-5 justify-center">
          {filteredProducts.map((product) => (
            <SingleItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;
