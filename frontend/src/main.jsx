// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import axios from "axios";

// // ensure axios sends cookies by default
// axios.defaults.withCredentials = true;

// // API base
// export const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// ensure axios sends cookies by default
axios.defaults.withCredentials = true;

// API base
export const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
