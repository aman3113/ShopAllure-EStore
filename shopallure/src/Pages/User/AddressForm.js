import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../Redux/UserSlice";

const AddressForm = ({ setShowForm, editIndex, editForm, setEditForm }) => {
  const addressArr = useSelector((store) => store.user.address);
  const [formDetails, setFormDetails] = useState(
    editForm
      ? addressArr[editIndex]
      : {
          name: "",
          location: "",
          city: "",
          state: "",
          country: "",
          pinCode: "",
          phoneNumber: "",
        }
  );
  const dispatch = useDispatch();

  function handleEditedChanges(e) {
    e.preventDefault();
    const editedAddressArr = addressArr.map((address, idx) => {
      if (editIndex === idx) {
        return formDetails;
      }
      return address;
    });
    dispatch(setAddress(editedAddressArr));
    setShowForm(false);
    setEditForm(false);
  }

  function handleSave(e) {
    e.preventDefault();
    dispatch(setAddress([...addressArr, formDetails]));
    setShowForm(false);
    setEditForm(false);
  }

  function handleCancel(e) {
    e.preventDefault();
    setShowForm(false);
    setEditForm(false);
  }

  function handleDummyData(e) {
    e.preventDefault();
    setFormDetails({
      name: "Antil Aman",
      location: "sec-14 MG-Road",
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      pinCode: "110039",
      phoneNumber: "8897456780",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className=" w-[35%] border border-black py-3 px-8 shadow-md shadow-purple-300 rounded-md">
      <p className="font-bold text-center text-lg m-3">Add New Address</p>
      <form className="flex flex-col">
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formDetails.name}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="text"
          placeholder="Enter House no., colony, street"
          name="location"
          value={formDetails.location}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="text"
          placeholder="Enter city"
          name="city"
          value={formDetails.city}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="text"
          placeholder="Enter state"
          name="state"
          value={formDetails.state}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="text"
          placeholder="Enter country"
          name="country"
          value={formDetails.country}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="number"
          placeholder="Enter PinCode"
          name="pinCode"
          value={formDetails.pinCode}
          onChange={handleChange}
        />
        <input
          className="border  border-gray-400 text-sm  p-1 my-2 hover:border-pink-300 rounded-md"
          type="number"
          placeholder="Enter Mobile Number"
          name="phoneNumber"
          value={formDetails.phoneNumber}
          onChange={handleChange}
        />
        <div className="flex justify-around m-3">
          {editForm ? (
            <button
              className="border bg-blue-700 text-white px-3 py-1 rounded-lg"
              onClick={handleEditedChanges}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="border bg-blue-700 text-white px-3 py-1 rounded-lg"
              onClick={handleSave}
            >
              Save
            </button>
          )}

          <button
            className="border bg-red-500 text-white px-3 py-1 rounded-lg"
            onClick={handleCancel}
          >
            Close
          </button>
          {!editForm && (
            <button
              className="border bg-purple-700 text-white px-3 py-1 rounded-lg"
              onClick={handleDummyData}
            >
              Fill Dummy Data
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
