import Sidebar from "adminPanel/components/Sidebar/Sidebar";
import { useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import adminRoutes from "routes/adminRoutes";

export const AdminLayout = (props) => {
  const mainContent = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  // const getTables = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route path={prop.path} element={prop.component} key={key} exact />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  return (
    <>
      <Sidebar
        {...props}
        routes={adminRoutes}
        logo={{
          innerLink: "/index",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <Routes>
          {getRoutes(adminRoutes)}
          <Route path="*" element={<Navigate to="/index" replace />} />
        </Routes>
      </div>
    </>
  );
};
