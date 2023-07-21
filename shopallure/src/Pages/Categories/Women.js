import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";
import Navbar from "../../Components/Navbar";

const Women = () => {
	const products = useSelector((store) => store.products.array);
	const womenProducts = products.filter(
		(product) => product.category === "Women"
	);
	const [filteredArray, setFilteredArray] = useState(womenProducts);

	return (
		<div>
			<Navbar
				originalArray={womenProducts}
				filteredArray={filteredArray}
				setFilteredArray={setFilteredArray}
			/>
			<div className="font-bold text-lg text-purple-800">
				Showing "{filteredArray.length}" items
			</div>
			<div className="flex  p-6">
				<div className="flex flex-wrap gap-5 justify-center">
					{filteredArray.map((product) => (
						<SingleItem key={product._id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Women;
