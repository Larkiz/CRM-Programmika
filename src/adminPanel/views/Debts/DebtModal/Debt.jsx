import { paymentHandle } from "functions/paymentHandle";
import { Card, Stack } from "@mui/material";
import { PaymentButtons } from "adminPanel/components/StatusButtonsPayments/PaymentControl";
import { PaymentStatus } from "adminPanel/components/StatusButtonsPayments/PaymentControl";
import { CardBody } from "commonComponents/Card/Card";

export const Debt = ({ debt, paymentDispatch }) => {
  return (
    <Card>
      <CardBody sx={{ padding: 1 }}>
        <div style={{ fontSize: 12 }}>
          <i
            className="fa-solid fa-calendar icon-blue"
            style={{ color: "#3860bc", marginRight: "5px" }}
          ></i>
          {debt.date}
        </div>
        <Stack direction={"row"} className="mt-2 mb-2">
          <PaymentStatus
            sx={{ fontSize: { xs: 11, sm: 15 } }}
            status={debt.payment_status}
          />
        </Stack>
        <Stack direction={"row"} gap={1}>
          <PaymentButtons
            sx={{ fontSize: { xs: 10, sm: 13 } }}
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
