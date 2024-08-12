import { useEffect, useReducer } from "react";
import {
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import { getStatus } from "./paymentControl";
import { paymentReducer } from "adminPanel/reducers/finance/paymentReducer";

export const GroupModal = ({ handleClose, show, course, date }) => {
  const [status, dispatch] = useReducer(paymentReducer, null);

  useEffect(() => {
    if (show) {
      fetch(
        `${process.env.REACT_APP_API_HOST_COMMON}/api/schedule/lesson/${course}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => dispatch({ type: "set", data }));
    }
    // eslint-disable-next-line
  }, [show]);

  return (
    <Modal isOpen={show} toggle={handleClose} backdrop={true}>
      <ModalHeader toggle={handleClose}>{course}</ModalHeader>
      <ModalBody>
        <Container>
          {status &&
            status.map((i, key) => {
              return (
                <Col className="p-3 mb-1" key={key}>
                  <Row className="mb-2">
                    {i.first_name} {i.last_name}
                    {getStatus(i.payment_status)}
                  </Row>
                  <Row>
                    <Label for="comment">Комментарий: </Label>
                    <Container
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        minHeight: "100px",
                      }}
                      fluid
                    >
                      {i.comment ? (
                        i.comment
                      ) : (
                        <span style={{ color: "gray" }}>Без комментария</span>
                      )}
                    </Container>
                  </Row>
                </Col>
              );
            })}
        </Container>
      </ModalBody>
    </Modal>
  );
};
