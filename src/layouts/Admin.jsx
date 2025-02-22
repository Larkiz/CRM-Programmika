import { Box, Container } from "@mui/material";
import { Sidebar } from "@/commonComponents/Sidebar/Sidebar";

import { useEffect, useRef } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import adminRoutes from "@/routes/adminRoutes";

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

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Box sx={{ width: { sm: 216 }, height: 56, flexShrink: { sm: 0 } }}>
        <Sidebar routes={adminRoutes} />
      </Box>

      <Container
        style={{
          marginBottom: "90px",

          overflowX: "hidden",
        }}
        sx={{
          marginLeft: { xs: 0, sm: "30px" },
          marginRight: { xs: 0, sm: "30px" },
        }}
        maxWidth="sx"
        className="mt-5"
        ref={mainContent}
      >
        <Routes>
          {getRoutes(adminRoutes)}
          <Route path="*" element={<Navigate to="/index" replace />} />
        </Routes>
      </Container>
    </Box>
  );
};
