import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const { message, status, statusText } = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] w-[100vw]">
      <h1 className="font-bold text-xl">Status: {status}</h1>
      <p className="text-lg">{statusText}</p>
      <p>{message}</p>
      <Link to="/" className="border px-4 py-1 mt-3 bg-black text-white">
        Return to HomePage
      </Link>
    </div>
  );
};

export default ErrorElement;
