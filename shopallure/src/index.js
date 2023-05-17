import React from "react";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import reactDom from "react-dom/client";

// Call make Server
makeServer();

reactDom.createRoot(document.getElementById("root")).render(<App />);
