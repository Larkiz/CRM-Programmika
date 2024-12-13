import { paymentHandle } from "@/functions/paymentHandle";
import { Card, Stack, Typography } from "@mui/material";
import { PaymentButtons } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { PaymentStatus } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { CardBody } from "@/commonComponents/Card/Card";
import DoneIcon from "@mui/icons-material/Done";
export const Debt = ({ debt, paymentDispatch }) => {
  return (
    <Card sx={{ backgroundColor: debt.passed ? "#e5e5e5" : "#fff" }}>
      <CardBody sx={{ padding: 1 }}>
        <Typography
          alignItems={"center"}
          display={"flex"}
          sx={{ fontSize: 12 }}
        >
          <i
            className="fa-solid fa-calendar icon-blue"
            style={{ color: "#3860bc", marginRight: "5px" }}
          ></i>
          {debt.date}
          {debt.passed ? <DoneIcon sx={{ fontSize: 20 }} color="#000" /> : null}
        </Typography>
        <Stack direction={"row"} sx={{ mt: 1, mb: 1 }}>
          <PaymentStatus
            sx={{ fontSize: { xs: 11, sm: 15 } }}
            status={debt.payment_status}
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <PaymentButtons
            sx={{ padding: "4px 5px", fontSize: { xs: 11, sm: 13 } }}
            onClick={(payment_status) =>
              paymentHandle(
                () =>
                  paymentDispatch({
                    type: "updateDebt",
                    id: debt.id,
                    payment_status,
                  }),
                {
                  id: debt.id,
                  payment_status,
                }
              )
            }
            paymentStatus={debt.payment_status}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};
