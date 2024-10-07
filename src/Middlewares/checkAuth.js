import { AdminLayout } from "layouts/Admin";
import { UserLayout } from "layouts/User";
import { Navigate } from "react-router-dom";

export const CheckAuth = ({ children }) => {
  let token = null;
  let role = null;

  if (localStorage.getItem("token") !== null) {
    sessionStorage.setItem("token", localStorage.getItem("token"));
    sessionStorage.setItem("role", localStorage.getItem("role"));
  }

  token = sessionStorage.getItem("token");
  role = sessionStorage.getItem("role");

  if (token === null || role === null) {
    return <Navigate to={`/auth`} />;
  }
  if (role === "admin") {
    return <AdminLayout />;
  }
  if (role === "user") {
    return <UserLayout />;
  }

  return children;
};
