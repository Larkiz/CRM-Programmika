import { Container } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import authRoutes from "@/routes/authRoutes";

export const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-programmika");
    return () => {
      document.body.classList.remove("bg-programmika");
    };
  }, []);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <Container
      sx={{ padding: "50px 0 50px 0" }}
      className="main-content"
      maxWidth={false}
    >
      <Routes>
        {getRoutes(authRoutes)}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Container>
  );
};
