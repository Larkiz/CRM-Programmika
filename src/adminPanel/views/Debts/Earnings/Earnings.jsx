import { Bar } from "react-chartjs-2";
import { Box, Stack, Typography } from "@mui/material";

export const Earnings = ({ chartEarningsData, chartDebtsData, options }) => {
  return (
    <Stack
      sx={{ mb: 5 }}
      flexWrap="wrap"
      direction={"row"}
      justifyContent={"center"}
    >
      <Box sx={{ flexBasis: 0, flexGrow: 1, maxWidth: "100%" }}>
        <Typography variant={"h4"}>Доход </Typography>

        {chartEarningsData && (
          <Bar data={chartEarningsData} options={options} />
        )}
      </Box>

      <Box sx={{ flexBasis: 0, flexGrow: 1, maxWidth: "100%" }}>
        <Typography variant={"h4"}>Не оплачено</Typography>

        {chartDebtsData && <Bar data={chartDebtsData} options={options} />}
      </Box>
    </Stack>
  );
};
