import { Typography } from "@mui/material";
import logo from "@/assets/img/brand/logo.png";
export const LogoBrand = ({ sx }) =>
  logo ? (
    <Typography
      sx={{
        textAlign: "center",

        ...sx,
      }}
      noWrap
    >
      <img width="170px" alt="..." className="navbar-brand-img" src={logo} />
    </Typography>
  ) : null;
