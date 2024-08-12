import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

import { CheckAuth } from "Middlewares/checkAuth";
import UserLayout from "layouts/User";

import { ToastContainer } from "react-toastify";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/index.css";
import "./assets/css/scss/custom.scss";

import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/" element={<CheckAuth />} />
        <Route
          path="/user/*"
          element={
            <CheckAuth>
              <UserLayout />
            </CheckAuth>
          }
        />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position={"top-right"}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      draggable
      theme={"colored"}
    />
  </>
);
