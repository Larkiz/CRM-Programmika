import { useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import userRoutes from "routes/userRoutes";
// reactstrap components

import Sidebar from "userPanel/components/Sidebar/Sidebar";

const UserLayout = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={userRoutes}
        logo={{
          innerLink: "/user/index",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(userRoutes)}
          <Route path="*" element={<Navigate to="/user/index" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default UserLayout;
