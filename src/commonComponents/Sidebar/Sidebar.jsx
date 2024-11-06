import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import { exitAccount } from "@/functions/exitAccount";

import { HideOnScroll } from "@/commonComponents/HideOnScroll/HideOnScroll";
import { LogoBrand } from "@/commonComponents/LogoBrand/LogoBrand";

export const Sidebar = ({ routes }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <ListItem className="nav-link" sx={{ p: 1 }} key={key} disablePadding>
          <ListItemButton
            component={NavLink}
            className="sidebar-link"
            to={prop.path}
            onClick={handleDrawerClose}
            sx={{ color: "#00000080", fontSize: 15 }}
          >
            <i className={prop.icon} />
            <Typography variant="body2">{prop.name}</Typography>
          </ListItemButton>
        </ListItem>
      );
    });
  };
  const navigate = useNavigate();
  const drawer = (
    <Box
      className="navbar-bg-programmika"
      sx={{
        padding: "5px 8px 24px 8px",
      }}
    >
      {window.innerWidth >= 768 ? <LogoBrand /> : null}
      <List>
        {createLinks(routes)}
        <ListItem
          sx={{ width: 215, margin: "0 auto" }}
          className="nav-link mt-3"
          key={"exit"}
          disablePadding
        >
          <ListItemButton
            className="exit-btn red-bg"
            sx={{ justifyContent: "center" }}
            onClick={() =>
              window.confirm("Вы хотите выйти из аккаунта?") &&
              exitAccount(navigate("/auth"))
            }
          >
            <Typography variant="body2">Выйти из аккаунта</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* MobileToolBar */}
      <HideOnScroll>
        <AppBar sx={{ backgroundColor: "#fff" }}>
          <Toolbar
            sx={{
              display: {
                sm: "none",
                backgroundColor: "#fff",
                position: "static",
                justifyContent: "space-between",
              },
            }}
          >
            <LogoBrand />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon
                sx={{
                  color: "#00000080",
                  border: "1px solid #0000001a",
                  fontSize: 30,
                  borderRadius: ".25rem",
                  width: 50,
                }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {/* Sidebars */}
      <Box component="nav">
        {/* Mobile */}
        <Drawer
          variant="temporary"
          anchor="top"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
