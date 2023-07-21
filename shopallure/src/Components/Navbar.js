import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { setFilteredArray } from "../Redux/ProductsSlice";

import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
} from "@chakra-ui/react";

const Navbar = ({ filteredArray, setFilteredArray, originalArray }) => {
	const [inputText, setInputText] = useState("");
	const [showFilterDrawer, setShowFilterDrawer] = useState(false);
	const [filtersApplied, setFiltersApplied] = useState(false);
	const [filters, setFilters] = useState({
		trending: false,
		inStock: false,
		size: "",
		price: 4900,
		rating: "",
	});

	function handleSelectRating(e) {
		setFilters((prev) => ({
			...prev,
			rating: e.target.value,
		}));
	}

	function handleFilterChange() {
		const { trending, inStock, size, price, rating } = filters;

		const trendingArray = trending
			? filteredArray.filter((item) => item.trending)
			: filteredArray;
		const stockArray = inStock
			? trendingArray.filter((item) => item.in_stock)
			: trendingArray;
		const sizeArray = size
			? stockArray.filter((item) => item.size === size)
			: stockArray;
		const priceArray =
			price > 0
				? sizeArray.filter((item) => Number(item.price) < Number(price))
				: sizeArray;
		const ratingArray = rating
			? priceArray.filter((item) => Number(item.rating) >= Number(rating))
			: priceArray;

		setFilteredArray(ratingArray);
		setShowFilterDrawer(false);
		setFiltersApplied(true);
	}

	function handleInput() {
		const searchFilteredArray = filteredArray.filter(
			(item) =>
				item.title.toLowerCase().includes(inputText.toLowerCase()) ||
				item.description.toLowerCase().includes(inputText.toLowerCase())
		);
		setFilteredArray(searchFilteredArray);
	}

	function handleClearFilter() {
		setFilters({
			trending: false,
			inStock: false,
			size: "",
			price: 4900,
		});
		setFilteredArray(originalArray);
		setShowFilterDrawer(false);
		setFiltersApplied(false);
	}

	return (
		<nav className="px-1 py-3">
			<div className="flex items-center  sm:flex-row ">
				<div className="flex gap-4 m-2">
					<p
						className={` text-lg cursor-pointer font-bold ${
							filtersApplied && "after:content-['(*)'] text-green-700"
						}`}
						onClick={() => setShowFilterDrawer(true)}
					>
						Filters
					</p>
				</div>

				<input
					className="p-1 px-2 border border-black text-gray-500 w-[60%] md:w-[40%] rounded-lg ml-auto mr-auto sm:mr-0"
					type="search"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onKeyDown={handleInput}
					placeholder="⌕  search product brand or type..."
				/>
			</div>
			<Drawer
				isOpen={showFilterDrawer}
				placement="left"
				onClose={() => setShowFilterDrawer(false)}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Filter your Products</DrawerHeader>

					<DrawerBody>
						<div className="flex flex-col  gap-8 my-3">
							<div className="flex flex-col gap-2">
								<span className="font-semibold">Filter by Rating:</span>
								<label htmlFor="1&above" className="flex gap-1 cursor-pointer">
									<input
										type="radio"
										name="rating"
										id="1&above"
										value="1"
										checked={filters.rating === "1"}
										className="cursor-pointer"
										onChange={handleSelectRating}
									/>
									rating 1 and above
								</label>

								<label htmlFor="2&above" className="flex gap-1 cursor-pointer">
									<input
										type="radio"
										name="rating"
										id="2&above"
										value="2"
										checked={filters.rating === "2"}
										className="cursor-pointer"
										onChange={handleSelectRating}
									/>
									rating 2 and above
								</label>
								<label htmlFor="3&above" className="flex gap-1 cursor-pointer">
									<input
										type="radio"
										name="rating"
										id="3&above"
										value="3"
										checked={filters.rating === "3"}
										className="cursor-pointer"
										onChange={handleSelectRating}
									/>
									rating 3 and above
								</label>
								<label htmlFor="4&above" className="flex gap-1 cursor-pointer">
									<input
										type="radio"
										name="rating"
										id="4&above"
										value="4"
										checked={filters.rating === "4"}
										className="cursor-pointer"
										onChange={handleSelectRating}
									/>
									rating 4 and above
								</label>
							</div>

							<div className="flex flex-col gap-3 ">
								<div>
									<span className="font-semibold mr-2">Size:</span>

									<select
										className="p-1 border text-sm md:text-base border-black rounded-md cursor-pointer"
										name="size"
										id="size"
										onChange={(e) =>
											setFilters((prev) => ({ ...prev, size: e.target.value }))
										}
									>
										<option selected={filters.size === ""} value="">
											All
										</option>
										<option selected={filters.size === "S"} value="S">
											S
										</option>
										<option selected={filters.size === "M"} value="M">
											M
										</option>
										<option selected={filters.size === "L"} value="L">
											L
										</option>
										<option selected={filters.size === "XL"} value="XL">
											XL
										</option>
										<option selected={filters.size === "XXL"} value="XXL">
											XXL
										</option>
									</select>
								</div>
								<div className="flex gap-2">
									<span className="font-semibold mr-2">Price:</span>
									<input
										type="range"
										min="500"
										max="5000"
										step="200"
										defaultValue={filters.price}
										className="cursor-pointer"
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												price: e.target.value,
											}))
										}
									/>
									<p>
										{"<"}Rs.{filters.price}
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<p className="font-semibold">Additional Filters:</p>
								<label htmlFor="trending">
									<input
										type="checkbox"
										name="trending"
										id="trending"
										checked={filters.trending}
										className="cursor-pointer mr-1"
										onChange={() =>
											setFilters((prev) => ({
												...prev,
												trending: !prev.trending,
											}))
										}
									/>
									Trending
								</label>
								<label htmlFor="inStock">
									<input
										type="checkbox"
										name="inStock"
										id="inStock"
										checked={filters.inStock}
										className="cursor-pointer mr-1"
										onChange={() =>
											setFilters((prev) => ({
												...prev,
												inStock: !prev.inStock,
											}))
										}
									/>
									In Stock
								</label>
							</div>
						</div>
					</DrawerBody>

					<DrawerFooter>
						<Button
							marginRight={20}
							onClick={handleClearFilter}
							colorScheme="blue"
						>
							Clear
						</Button>
						<Button onClick={handleFilterChange} colorScheme="blue">
							Apply Filter
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</nav>
	);
};

export default Navbar;
