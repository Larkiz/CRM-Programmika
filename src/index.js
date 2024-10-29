import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CheckAuth } from "Middlewares/checkAuth";

import { ToastContainer } from "react-toastify";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import "bootstrap/dist/css/bootstrap.min.css";

import "react-toastify/dist/ReactToastify.css";

import "moment/locale/ru";
import "./assets/css/scss/custom.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { AuthLayout } from "layouts/Auth";
import { createTheme, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 400,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);
