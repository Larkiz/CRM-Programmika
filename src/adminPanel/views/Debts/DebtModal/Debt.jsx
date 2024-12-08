import { paymentHandle } from "@/functions/paymentHandle";
import { Card, Stack, Typography } from "@mui/material";
import { PaymentButtons } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { PaymentStatus } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { CardBody } from "@/commonComponents/Card/Card";

export const Debt = ({ debt, paymentDispatch }) => {
  return (
    <Card>
      <CardBody sx={{ padding: 1 }}>
        <Typography sx={{ fontSize: 12 }}>
          <i
            className="fa-solid fa-calendar icon-blue"
            style={{ color: "#3860bc", marginRight: "5px" }}
          ></i>
          {debt.date}
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
