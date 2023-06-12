import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api";
import { useDispatch } from "react-redux";
import { handleAuth } from "../../Redux/Store";
import { setProfile } from "../../Redux/UserSlice";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkbox: false,
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, firstName, lastName, checkbox } = formData;
    try {
      const resp = await authenticateUser(
        {
          email,
          password,
          firstName,
          lastName,
        },
        "signup"
      );
      const { encodedToken, createdUser } = resp;
      if (checkbox) {
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("user", JSON.stringify(createdUser));
        localStorage.setItem("eCommerceLoggedIn", true);
      } else {
        sessionStorage.setItem("encodedToken", encodedToken);
        sessionStorage.setItem("user", JSON.stringify(createdUser));
        sessionStorage.setItem("eCommerceLoggedIn", true);
      }
      dispatch(handleAuth());
      dispatch(setProfile(createdUser));
      toast(`Welcome ${createdUser.firstName}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) =>
      name === "checkbox"
        ? { ...prev, checkbox: !prev["checkbox"] }
        : {
            ...prev,
            [name]: value,
          }
    );
  }

  return (
    <div className="w-full h-[70vh] border flex flex-col gap-6 justify-center items-center p-8">
      <h1 className="text-2xl md:4xl font-bold">Sign up here</h1>
      {error && <p className="text-red-500  md:text-xl">{error.message}</p>}
      <form
        className="flex flex-col gap-3 w-[75%] md:w-[50%]"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-3">
          <input
            className="border p-2 w-[50%] text-lg  hover:border-pink-400"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            className="border w-[50%] p-2 text-lg  hover:border-pink-400"
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          className="border p-2 text-lg  hover:border-pink-400"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Enter Email address"
        />
        <input
          className="border p-2 text-lg  hover:border-pink-400"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
        />
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="remember"
            name="checkbox"
            checked={formData.checkbox}
            onChange={handleChange}
            className="w-4 h-4 "
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="border bg-purple-300  font-bold p-2 text-lg mt-3">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
