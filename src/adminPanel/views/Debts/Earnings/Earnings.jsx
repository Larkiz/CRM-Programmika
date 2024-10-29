import { Bar } from "react-chartjs-2";
import { Stack } from "@mui/material";

export const Earnings = ({ chartEarningsData, chartDebtsData, options }) => {
  return (
    <Stack flexWrap="wrap" direction={"row"} justifyContent={"center"}>
      <div
        style={{ flexBasis: 0, flexGrow: 1, maxWidth: "100%" }}
        className="mt-4 mb-3"
      >
        <h2>Доход </h2>

        {chartEarningsData && (
          <Bar data={chartEarningsData} options={options} />
        )}
      </div>

      <div
        style={{ flexBasis: 0, flexGrow: 1, maxWidth: "100%" }}
        className="mt-4 mb-3"
      >
        <h2>Не оплачено</h2>

        {chartDebtsData && <Bar data={chartDebtsData} options={options} />}
      </div>
    </Stack>
  );
};
