import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CheckAuth } from "Middlewares/checkAuth";

import { ToastContainer } from "react-toastify";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/index.css";

import "react-toastify/dist/ReactToastify.css";

import "moment/locale/ru";
import "./assets/css/scss/custom.scss";

import { AuthLayout } from "layouts/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/*" element={<CheckAuth />} />
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
