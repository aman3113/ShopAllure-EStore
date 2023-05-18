export async function authenticateUser(creds, path) {
  const resp = await fetch(`/api/auth/${path}`, {
    method: "POST",
    body: JSON.stringify(creds),
  });

  return resp;
}

export async function getProducts() {
  const resp = await fetch("/api/products");
  const data = await resp.json();

  return data;
}
