import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import "./index.css";

axios.defaults.baseURL = "https://sklad.legends.uz/api/v1/";

const token = sessionStorage.getItem("token");

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <ToastContainer />
  </BrowserRouter>
);
