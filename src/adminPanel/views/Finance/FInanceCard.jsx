import { numberIsNegative } from "functions/numberIsNegatibe";
import { Card, CardText, CardTitle } from "reactstrap";

export const FinanceCard = ({ children, type, value }) => {
  const icon =
    type === "earning"
      ? "fa-solid fa-money-bill-trend-up"
      : "fa-solid fa-building-columns";

  return (
    <Card className="shadow p-3 mb-5 bg-white rounded text-center finance-card">
      <CardTitle>
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

      <CardText style={{ fontWeight: 500, fontSize: 15 }}>{children}</CardText>
      <CardText style={{ fontWeight: 600, fontSize: 20 }}>
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
            {value ? value : 0}
            <i className="fa-solid fa-ruble-sign"></i>
          </span>
        }
      </CardText>
    </Card>
  );
};
