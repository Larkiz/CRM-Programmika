import { Paper, Stack, Typography } from "@mui/material";

export const StatCard = ({ children, value, icon, sx }) => {
  return (
    <Paper sx={{ ...sx }} elevation={3}>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        {icon}

        <Stack sx={{ p: 2 }}>
          <Typography
            sx={{ color: "#939393" }}
            alignSelf={"end"}
            variant="subtitle2"
          >
            {children}
          </Typography>

          <Typography alignSelf={"end"} variant="h4">
            {value && value}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
