import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";
import Navbar from "../../Components/Navbar";

const Clothes = () => {
	const products = useSelector((store) => store.products.array);
	// const filteredProducts = useSelector((store) => store.products.filteredArray);
	const [filteredArray, setFilteredArray] = useState(products);
	return (
		<div>
			<Navbar
				originalArray={products}
				filteredArray={filteredArray}
				setFilteredArray={setFilteredArray}
			/>
			<div className="font-bold text-lg text-purple-800">
				Showing "{filteredArray.length}" items
			</div>
			<div className="flex   p-6">
				<div className="flex flex-wrap gap-5 justify-center w-full">
					{filteredArray.map((product) => (
						<SingleItem key={product._id} product={product} />
					))}
					{filteredArray.length === 0 && (
						<p className="text-xl font-bold text-purple-700 p-8 text-center">
							Try removing some filters
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Clothes;
