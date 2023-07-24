import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";
import Navbar from "../../Components/Navbar";

const Kids = () => {
	const products = useSelector((store) => store.products.array);
	const kidsProducts = products.filter(
		(product) => product.category === "Kids"
	);
	const [filteredArray, setFilteredArray] = useState(kidsProducts);
	return (
		<div>
			<Navbar
				originalArray={kidsProducts}
				filteredArray={filteredArray}
				setFilteredArray={setFilteredArray}
			/>
			<div className="font-bold text-lg text-purple-800">
				Showing "{filteredArray.length}" items
			</div>
			<div className="flex   p-6">
				<div className="flex flex-wrap gap-5 justify-center w-full ">
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

export default Kids;
