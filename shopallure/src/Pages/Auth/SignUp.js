import React from "react";
import { Form, Navigate, useActionData } from "react-router-dom";
import { authenticateUser } from "../../api";
import { useSelector } from "react-redux";

export async function action({ request }) {
  const formData = await request.formData();

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const isChecked = formData.get("checkbox");
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
    console.log(resp);
    if (isChecked) {
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("user", JSON.stringify(createdUser));
      localStorage.setItem("eCommerceLoggedIn", true);
    } else {
      sessionStorage.setItem("encodedToken", encodedToken);
      sessionStorage.setItem("user", JSON.stringify(createdUser));
      sessionStorage.setItem("eCommerceLoggedIn", true);
    }
    window.location.reload();
    return null;
  } catch (err) {
    console.log(err);
    return err;
  }
}

const SignUp = () => {
  const { eCommerceLoggedIn } = useSelector((store) => store.auth);
  const error = useActionData();

  if (eCommerceLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-[70vh] border flex flex-col gap-6 justify-center items-center p-8">
      <h1 className="text-2xl md:4xl font-bold">Sign up here</h1>
      {error && <p className="text-red-500  md:text-xl">{error.message}</p>}
      <Form
        className="flex flex-col gap-3 w-[75%] md:w-[50%]"
        method="post"
        replace
      >
        <div className="flex items-center gap-3">
          <input
            className="border p-2 w-[50%] text-lg  hover:border-pink-400"
            type="text"
            name="firstName"
            placeholder="First name"
          />
          <input
            className="border w-[50%] p-2 text-lg  hover:border-pink-400"
            type="text"
            name="lastName"
            placeholder="Last name"
          />
        </div>
        <input
          className="border p-2 text-lg  hover:border-pink-400"
          name="email"
          type="email"
          placeholder="Enter Email address"
        />
        <input
          className="border p-2 text-lg  hover:border-pink-400"
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="remember"
            name="checkbox"
            className="w-4 h-4 "
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="border bg-purple-300  font-bold p-2 text-lg mt-3">
          Sign Up
        </button>
      </Form>
    </div>
  );
};

export default SignUp;
