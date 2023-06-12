import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilteredArray } from "../Redux/ProductsSlice";

const Navbar = ({ itemArray }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [showFilterTab, setShowFilterTab] = useState(false);

  const [filters, setFilters] = useState({
    trending: false,
    inStock: false,
    size: "",
    price: 0,
  });

  useEffect(() => {
    handleFilterChange();
  }, [filters]);

  function handleFilterChange() {
    const { trending, inStock, size, price } = filters;

    const trendingArray = trending
      ? itemArray.filter((item) => item.trending)
      : itemArray;
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

    dispatch(setFilteredArray(priceArray));
  }

  function handleInput() {
    const filteredArray = itemArray.filter(
      (item) =>
        item.title.toLowerCase().includes(inputText.toLowerCase()) ||
        item.description.toLowerCase().includes(inputText.toLowerCase())
    );
    dispatch(setFilteredArray(filteredArray));
  }
  return (
    <nav className="p-1 px-4 sm:p-4 m-1">
      <div className="flex items-center  sm:flex-row ">
        <div className="flex gap-4 m-2">
          <p
            className="cursor-pointer font-bold"
            onClick={() => setShowFilterTab((prev) => !prev)}
          >
            Filters
          </p>
          {showFilterTab && (
            <p
              className="underline font-semibold cursor-pointer"
              onClick={() =>
                setFilters({
                  trending: false,
                  inStock: false,
                  size: "",
                  price: 0,
                })
              }
            >
              Clear
            </p>
          )}
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
      {showFilterTab && (
        <div className="flex flex-col sm:flex-row gap-8 my-3 sm:items-center">
          <div className="flex gap-3">
            <span
              className={`border-2 px-2 py-1 rounded-md cursor-pointer ${
                filters.trending && "bg-pink-200"
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, trending: !prev.trending }))
              }
            >
              Trending
            </span>
            <span
              className={`border-2 px-2 py-1 rounded-md cursor-pointer ${
                filters.inStock && "bg-pink-200"
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
              }
            >
              In Stock
            </span>
          </div>

          <div className="flex gap-3 items-center">
            <span className="font-semibold">Size:</span>
            <select
              className="p-1 border text-sm md:text-base border-black rounded-md cursor-pointer"
              name="size"
              id="size"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, size: e.target.value }))
              }
            >
              <option value="" default>
                All
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <span className="font-semibold">Price:</span>{" "}
            <input
              type="range"
              min="500"
              max="5000"
              step="200"
              defaultValue="5000"
              className="cursor-pointer"
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
