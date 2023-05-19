import { useSelector } from "react-redux";

export async function authenticateUser(creds, path) {
  const resp = await fetch(`/api/auth/${path}`, {
    method: "POST",
    body: JSON.stringify(creds),
  });
  const data = await resp.json();
  if (!resp.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: data.errors,
      statusText: resp.statusText,
      status: resp.status,
    };
  }

  return data;
}

// Cart functions

export async function getCartData(path) {
  const encodedToken =
    localStorage.getItem("encodedToken") ??
    sessionStorage.getItem("encodedToken");

  const resp = await fetch(`/api/user/${path}`, {
    method: "GET",
    headers: {
      authorization: encodedToken,
    },
  });
  const data = await resp.json();

  if (!resp.ok) {
    // eslint-disable-next-line no-throw-literal
    throw {
      message: data.errors,
      statusText: resp.statusText,
      status: resp.status,
    };
  }

  return data;
}

// Products

export async function getProducts() {
  const resp = await fetch("/api/products");
  const data = await resp.json();

  return data;
}
