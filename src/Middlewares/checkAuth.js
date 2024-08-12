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

  const layout = window.location.pathname.split("/")[1];

  if (layout === "admin" && role === "user") {
    return <Navigate to={`/user/index`} />;
  }
  if (layout === "user" && role === "admin") {
    return <Navigate to={"/admin/index"} />;
  }
  if (token === null || role === null) {
    return <Navigate to={`/auth`} />;
  }
  if (!children) {
    return <Navigate to={`/user/index`} />;
  }
  return children;
};
