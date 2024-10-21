import { Row } from "reactstrap";

import { getStatus } from "adminPanel/components/StatusButtonsPayments/paymentControl";
import { getButtons } from "adminPanel/components/StatusButtonsPayments/paymentControl";
import { paymentHandle } from "functions/paymentHandle";

const nullMargin = { margin: 0 };

export const Debt = ({ debt, paymentDispatch }) => {
  return (
    <div className="border p-2 mt-2 rounded">
      <div>
        <i
          className="fa-solid fa-calendar icon-blue"
          style={{ color: "#3860bc", marginRight: "5px" }}
        ></i>
        {debt.date}
      </div>
      <Row style={nullMargin} className="mt-2 mb-2">
        {getStatus(debt.payment_status)}
      </Row>

      <Row className="gap-5" style={nullMargin}>
        {getButtons(debt.payment_status, (payment_status) =>
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
        )}
      </Row>
    </div>
  );
};
