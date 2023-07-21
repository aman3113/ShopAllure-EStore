import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { setAddress } from "../../Redux/UserSlice";
import { toast } from "react-toastify";

const User = () => {
	const [details, setDetails] = useState("profile");
	const [editForm, setEditForm] = useState(false);
	const [editIndex, setEditIndex] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const dispatch = useDispatch();

	const { firstName, lastName, email } = useSelector(
		(store) => store.user.profile
	);
	const addressArr = useSelector((store) => store.user.address);

	function handleEdit(idx) {
		setEditForm(true);
		setShowForm(true);
		setEditIndex(idx);
	}

	function handleRemove(idx) {
		const newAddressArr = addressArr.filter((address, index) => index !== idx);
		console.log(newAddressArr);
		dispatch(setAddress(newAddressArr));
	}

	function handleClick() {
		localStorage.removeItem("encodedToken");
		localStorage.removeItem("eCommerceLoggedIn");
		sessionStorage.removeItem("encodedToken");
		sessionStorage.removeItem("eCommerceLoggedIn");
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("user");
		toast("You are logged out");
		window.location.reload();
	}
	return (
		<div className="min-h-[70vh] flex items-center justify-center ">
			{showForm ? (
				<AddressForm
					setShowForm={setShowForm}
					setEditForm={setEditForm}
					editIndex={editIndex}
					editForm={editForm}
				/>
			) : (
				<div className="w-[80%] md:w-[60%] border-2 border-black p-1 md:p-3 shadow-md shadow-purple-300 rounded-md my-3">
					<h1 className="text-center font-bold text-xl m-4">Account</h1>
					<div>
						<div className=" flex ">
							<span
								className={`w-[50%] text-center cursor-pointer ${
									details === "profile" &&
									"bg-purple-400 border-b-2 border-purple-900"
								}`}
								onClick={() => setDetails("profile")}
							>
								Profile
							</span>
							<span
								className={`w-[50%] text-center cursor-pointer ${
									details === "address" &&
									"bg-purple-400 border-b-2  border-purple-900"
								}`}
								onClick={() => setDetails("address")}
							>
								Address
							</span>
						</div>
						{details === "profile" && (
							<div className="p-2">
								<p className="font-bold mb-3">Profile Details</p>
								<p>
									<span className="font-semibold">Full Name :</span> {firstName}{" "}
									{lastName}
								</p>
								<p>
									{" "}
									<span className="font-semibold">Email:</span> {email}
								</p>
								<button
									onClick={handleClick}
									className="bg-red-600 text-white py-1 px-2 rounded-lg mt-3"
								>
									LogOut
								</button>
							</div>
						)}
						{details === "address" && (
							<div className="p-2">
								<p className="font-bold underline mb-4">My Addresses</p>
								{addressArr.map((address, idx) => (
									<div key={idx} className="bg-slate-100 p-2 m-1">
										<p className="font-semibold">{address.name}</p>
										<p>{address.location}</p>
										<p>{address.pinCode}</p>
										<p>
											{address.city}, {address.state}
										</p>
										<p>{address.country}</p>
										<div className="mt-1">
											<button
												className="border text-blue-800 bg-white py-1 mr-3 px-2 rounded-lg font-semibold"
												onClick={() => handleEdit(idx)}
											>
												Edit
											</button>
											<button
												className="border text-red-500 bg-white py-1 px-2 rounded-lg font-semibold"
												onClick={() => handleRemove(idx)}
											>
												Remove
											</button>
										</div>
									</div>
								))}
								<button
									className="font-bold mt-3"
									onClick={() => setShowForm((prev) => !prev)}
								>
									+ Add new address
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
