/*eslint-disable*/
import { useState } from "react";
import { NavLink as NavLinkRRD, Link, useNavigate } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Button,
} from "reactstrap";

import { exitAccount } from "functions/exitAccount";

const Sidebar = (props) => {
  const [collapseOpen, setCollapseOpen] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };

  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

  const { routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  let navigate = useNavigate();
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white border-right"
      expand="md"
      id="sidenav-main"
    >
      {logo ? (
        <NavbarBrand className="pt-0" {...navbarBrandProps}>
          <img
            alt={logo.imgAlt}
            className="navbar-brand-img"
            src={logo.imgSrc}
          />
        </NavbarBrand>
      ) : null}
      <button
        className="navbar-toggler "
        type="button"
        onClick={toggleCollapse}
        style={{ width: "56px", height: "40px" }}
      >
        <span
          className={collapseOpen ? "ni ni-fat-remove" : "navbar-toggler-icon"}
        />
      </button>

      <Collapse navbar isOpen={collapseOpen}>
        <Nav navbar>
          {createLinks(routes)}

          <NavItem key={"exit"}>
            <NavLink>
              <Button
                className="mt-5 red-bg"
                onClick={() =>
                  confirm("Вы хотите выйти из аккаунта?") &&
                  exitAccount(navigate("/auth"))
                }
              >
                Выйти из аккаунта
              </Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
