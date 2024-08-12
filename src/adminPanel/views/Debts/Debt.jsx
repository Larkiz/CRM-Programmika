import { Button, Col, Collapse, Container, Row } from "reactstrap";

import { useState } from "react";
import { getStatus } from "adminPanel/components/StatusButtonsPayments/paymentControl";
import { getButtons } from "adminPanel/components/StatusButtonsPayments/paymentControl";
import { paymentHandle } from "functions/paymentHandle";

const nullMargin = { margin: 0 };

export const Debt = ({ debt, paymentDispatch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Container fluid className="p-3 mb-1 ">
      <Col>
        <Row style={nullMargin} className="mb-2">
          {debt.first_name} {debt.last_name}
        </Row>
        <Row style={nullMargin} className="mb-2">
          Id {debt.student_id}
        </Row>
        <Row style={nullMargin} className="mb-2">
          {debt.course}
        </Row>

        <Button color="primary" onClick={toggle}>
          Посмотреть
        </Button>
        <Collapse isOpen={isOpen}>
          <Container className="debt-grid" fluid>
            {debt.debts.map((debt) => {
              return (
                <Col className="border p-2 mt-2 rounded" key={debt.id}>
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

                  <Row style={nullMargin}>
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
                </Col>
              );
            })}
          </Container>
        </Collapse>
      </Col>
    </Container>
  );
};
