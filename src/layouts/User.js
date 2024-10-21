import { Box } from "@mui/material";
import { Sidebar } from "commonComponents/Sidebar/Sidebar";

import { useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import userRoutes from "routes/userRoutes";
// reactstrap components

export const UserLayout = (props) => {
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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Box sx={{ width: { sm: 216 }, height: 56, flexShrink: { sm: 0 } }}>
        <Sidebar
          {...props}
          routes={userRoutes}
          logo={{
            innerLink: "/index",
            imgSrc: require("../assets/img/brand/logo.png"),
            imgAlt: "...",
          }}
        />
      </Box>
      <Box
        ref={mainContent}
        sx={{
          flexGrow: 1,

          width: { sm: `calc(100% - ${216}px)` },
        }}
      >
        <Routes>
          {getRoutes(userRoutes)}
          <Route path="*" element={<Navigate to="/index" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};
