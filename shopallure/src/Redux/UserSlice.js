import { createSlice } from "@reduxjs/toolkit";

const address = [
  {
    name: "Adarsh Balika",
    location: "#1/4 , 100ft Ring Road",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    pinCode: "110003",
    phoneNumber: "8899456780",
  },
];

const profile = JSON.parse(
  localStorage.getItem("user") ?? sessionStorage.getItem("user")
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: profile ?? {},
    address,
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});
export const { setProfile, setAddress } = userSlice.actions;
export default userSlice;
