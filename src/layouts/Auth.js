import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// reactstrap components
import { Container, Row } from "reactstrap";

import logo from "assets/img/brand/logo.png";
import authRoutes from "routes/authRoutes";

const Auth = () => {
  const mainContent = React.useRef(null);

  React.useEffect(() => {
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
    <>
      <div className="main-content" ref={mainContent}>
        <div className="header py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <img className="navbar-brand-img" src={logo} alt="logo" />
              </Row>
            </div>
          </Container>
        </div>

        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Routes>
              {getRoutes(authRoutes)}
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Auth;
