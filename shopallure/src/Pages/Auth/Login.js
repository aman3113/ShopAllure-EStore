import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api";
import { useDispatch } from "react-redux";
import { handleAuth } from "../../Redux/Store";
import { setProfile } from "../../Redux/UserSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkbox: false,
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, checkbox } = formData;
    try {
      const resp = await authenticateUser(
        {
          email,
          password,
        },
        "login"
      );

      const { encodedToken, foundUser } = resp;

      if (checkbox) {
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("eCommerceLoggedIn", true);
      } else {
        sessionStorage.setItem("encodedToken", encodedToken);
        sessionStorage.setItem("eCommerceLoggedIn", true);
      }
      dispatch(handleAuth());
      dispatch(setProfile(foundUser));
      toast(`Welcome ${foundUser.firstName}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function handleGuestLogin(e) {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      email: "adarshbalika@gmail.com",
      password: "adarshbalika",
    }));
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
      <h1 className="text-2xl md:4xl font-bold">Login to your Account</h1>
      {error && <p className="text-red-500  md:text-xl">{error.message}</p>}
      <form
        className="flex flex-col gap-3 w-[75%] md:w-[50%] "
        onSubmit={handleSubmit}
      >
        <input
          className="border p-2 text-lg hover:border-pink-400"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email address"
        />
        <input
          className="border p-2 text-lg hover:border-pink-400"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="remember"
            name="checkbox"
            value={formData.checkbox}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="border bg-purple-300  font-bold p-2 text-lg mt-3">
          Log In
        </button>
        <button
          className="border bg-purple-300  font-bold p-2 text-lg mt-3"
          onClick={handleGuestLogin}
        >
          Log In as Guest
        </button>

        <p>
          Not an Existing User?
          <Link
            to="/sign-up"
            className="underline text-purple-600 ml-1 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
