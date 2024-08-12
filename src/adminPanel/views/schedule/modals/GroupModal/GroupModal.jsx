import { useEffect, useReducer } from "react";
import { Container, Modal, ModalBody, ModalHeader } from "reactstrap";

import { paymentReducer } from "adminPanel/reducers/finance/paymentReducer";

import { ModalStudent } from "./ModalStudent";

export const GroupModal = ({ handleClose, show, course, date }) => {
  const [debts, paymentDispatch] = useReducer(paymentReducer, null);

  useEffect(() => {
    if (show) {
      fetch(
        `${process.env.REACT_APP_API_HOST}/api/finance/debt/${course}?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => paymentDispatch({ type: "set", data }));
    }
    // eslint-disable-next-line
  }, [show]);

  return (
    <Modal isOpen={show} toggle={handleClose} backdrop={true}>
      <ModalHeader toggle={handleClose}>{course}</ModalHeader>
      <ModalBody>
        <Container>
          {debts &&
            debts.map((i, key) => {
              return (
                <ModalStudent
                  key={key}
                  student={i}
                  paymentDispatch={paymentDispatch}
                />
              );
            })}
        </Container>
      </ModalBody>
    </Modal>
  );
};
