import { Card, Typography } from "@mui/material";
import { CardTitle } from "@/commonComponents/Card/Card";

import { numberIsNegative } from "@/functions/numberIsNegatibe";
import { numberWithDots } from "@/functions/numberWithDots";

export const FinanceCard = ({ children, type, value, sx }) => {
  const icon =
    type === "earning"
      ? "fa-solid fa-money-bill-trend-up"
      : "fa-solid fa-building-columns";

  return (
    <Card
      sx={{ p: 3, mb: 5, textAlign: "center", ...sx }}
      elevation={2}
      className="finance-card"
    >
      <CardTitle noBorder>
        <i
          style={{
            fontSize: 20,
            backgroundColor: "rgb(58, 130, 214)",
            padding: 25,
            borderRadius: "0.5rem",
            color: "#fff",
          }}
          className={icon}
        ></i>
      </CardTitle>

      <Typography sx={{ fontWeight: 500, fontSize: 15 }}>{children}</Typography>
      <Typography sx={{ fontSize: 18 }}>
        {
          <span
            className={
              value === null
                ? undefined
                : numberIsNegative(value)
                ? "red-text"
                : "green-text"
            }
          >
            {value ? numberWithDots(value) : 0}
            <i className="fa-solid fa-ruble-sign"></i>
          </span>
        }
      </Typography>
    </Card>
  );
};
