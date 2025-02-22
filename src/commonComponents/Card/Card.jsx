import { CardContent, Typography } from "@mui/material";

export const CardTitle = ({
  children,
  variant = "h5",
  sx,
  noBorder = false,
  component = "div",
}) => {
  return (
    <Typography
      sx={{
        borderBottom: noBorder ? null : "1px solid #c9cccf",
        marginBottom: 1,
        margin: "16px 16px 0 16px",
        ...sx,
      }}
      variant={variant}
      component={component}
    >
      {children}
    </Typography>
  );
};
export const CardBody = ({
  children,
  variant = "body2",
  component = "div",
  sx,
}) => {
  return (
    <CardContent
      sx={{
        ...sx,
      }}
      component={component}
      variant={variant}
    >
      {children}
    </CardContent>
  );
};
