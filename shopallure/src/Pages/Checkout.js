import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleCartItem } from "../Redux/CartsSlice";
import { toast } from "react-toastify";

const Checkout = () => {
	const cartItems = useSelector((store) => store.cart.value);
	const addressArr = useSelector((store) => store.user.address);

	const [selectedAddress, setSelectedAddress] = useState(0);

	const totalPrice = cartItems?.reduce(
		(acc, curr) => (acc += curr.price * curr.qty),
		0
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Razorpay Integration

	const paymentHandler = () => {
		if (addressArr.length === 0 || cartItems.length === 0) {
			return alert("No items in cart");
		}
		var option = {
			key: "rzp_test_hUBxRJ1wN1StVA",
			key_secret: "0m0U5Fn6gtyRE3X1tQ9LQZz0",
			amount: Number(totalPrice) * 100,
			currency: "INR",
			name: "Shopalure store",
			description: "Test Transaction",
			image: "https://example.com/your_logo",
			handler: (res) => {
				console.log(res);
				dispatch(handleCartItem([]));
				navigate("/clothes");
				toast.success("Order has been Placed.");
			},
			prefill: {
				name: "Aman",
				email: "antilaman3113@example.com",
				contact: "8397065201",
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#3399cc",
			},
		};

		var pay = new window.Razorpay(option);
		pay.open();
	};

	return (
		<div className="min-h-[70vh] flex p-2 sm:p-5 justify-center ">
			<div className="flex flex-col gap-6 lg:flex-row w-[90vw] lg:w-[70vw]  items-center lg:items-start">
				<div className=" w-full lg:w-[50%] border-1 p-2 border-black shadow-md shadow-purple-400">
					{addressArr.length > 0 ? (
						<div>
							<p className="text-center text-xl font-bold">Address</p>
							{addressArr.map((address, idx) => (
								<div
									key={idx}
									className={`bg-slate-100 p-2 m-1 rounded-lg my-2 ${
										selectedAddress === idx && "border-2 border-purple-400"
									}`}
									onClick={() => setSelectedAddress(idx)}
								>
									<p className="font-semibold">{address.name}</p>
									<p>
										{address.location},{address.pinCode}
									</p>
									<p>
										{address.city}, {address.state}
									</p>
									<p>{address.country}</p>
								</div>
							))}
							<Link to="/user" className="font-bold">
								+ Add Address
							</Link>
						</div>
					) : (
						<Link to="/user">Go to Profile</Link>
					)}
				</div>
				<div className=" w-full lg:w-[50%] border-1 p-2 border-black shadow-md shadow-purple-400">
					<p className="text-xl font-bold text-center">Bill Details</p>
					<p className="flex justify-between">
						<span className="font-semibold">MRP:</span>
						<span>Rs.{totalPrice}</span>
					</p>
					<p className="flex justify-between">
						<span className="font-semibold">Delivery:</span>
						<span>Free</span>
					</p>
					<p className="flex justify-between border-t-2 border-black mt-3">
						<span className="font-bold">Grand Total:</span>
						<span>Rs.{totalPrice}</span>
					</p>
					{addressArr.length > 0 ? (
						<div>
							<p className="font-bold text-lg mt-4">Delivering to:</p>
							<p className="font-semibold">
								{addressArr[selectedAddress].name}
							</p>
							<p>
								{addressArr[selectedAddress].location},
								{addressArr[selectedAddress].state},
								{addressArr[selectedAddress].city}
							</p>
							<button
								className="bg-purple-950 text-white font bold w-full p-2 rounded-md my-2"
								onClick={paymentHandler}
							>
								Place Order
							</button>
						</div>
					) : (
						<Link
							to="/user"
							className="text-lg text-red-700 font-semibold text-center"
						>
							"Please add address"
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Checkout;
