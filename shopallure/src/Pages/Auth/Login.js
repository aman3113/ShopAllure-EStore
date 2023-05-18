import React from "react";
import {
  Form,
  Link,
  Navigate,
  redirect,
  useActionData,
} from "react-router-dom";
import { authenticateUser } from "../../api";
import { useSelector } from "react-redux";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const isChecked = formData.get("checkbox");
  const resp = await authenticateUser({ email, password }, "login");

  if (resp.ok) {
    const { encodedToken, foundUser } = await resp.json();
    if (isChecked) {
      localStorage.setItem("encodedToken", encodedToken);
      localStorage.setItem("eCommerceLoggedIn", true);
    } else {
      sessionStorage.setItem("encodedToken", encodedToken);
      sessionStorage.setItem("eCommerceLoggedIn", true);
    }
    window.location.reload();
    return null;
  } else {
    const { errors } = await resp.json();
    console.log(await resp.json());
    return errors;
  }
}

const Login = () => {
  const { eCommerceLoggedIn } = useSelector((store) => store.auth);
  const error = useActionData();
  if (eCommerceLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-full h-[70vh] border flex flex-col gap-6 justify-center items-center p-8">
      <h1 className="text-2xl md:4xl font-bold">Login to your Account</h1>
      {error && <p className="text-red-500  md:text-xl">{error}</p>}
      <Form
        className="flex flex-col gap-3 w-[75%] md:w-[50%]"
        method="post"
        replace
      >
        <input
          className="border p-2 text-lg"
          name="email"
          type="email"
          placeholder="Enter Email address"
        />
        <input
          className="border p-2 text-lg"
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            id="remember"
            name="checkbox"
            className="w-4 h-4"
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button className="border bg-black text-white p-2 text-lg">
          Log In
        </button>
        <p>
          Not an Existing User?{" "}
          <Link to="/sign-up" className="underline text-blue-400">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
