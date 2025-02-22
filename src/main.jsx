import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import "react-toastify/dist/ReactToastify.css";

import "moment/dist/locale/ru";
import "./assets/css/scss/custom.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme, ThemeProvider } from "@mui/material";

import { AuthLayout } from "@/layouts/Auth";
import { CheckAuth } from "@/middlewares/checkAuth";

import { GroupsContextProvider } from "@/adminPanel/Context/GroupsContextProvider";
import { ClipboardSnackbar } from "@/adminPanel/components/SnackBar/ClipboardSnackbar";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsm: 400,
      sm: 768,
      md: 900,
      lg: 1020,
      xl: 1536,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <GroupsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<AuthLayout />} />

          <Route path="/*" element={<CheckAuth />} />
        </Routes>
      </BrowserRouter>
      <ClipboardSnackbar />
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
    </GroupsContextProvider>
  </ThemeProvider>
);
