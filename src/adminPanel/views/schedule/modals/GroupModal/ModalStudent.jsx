import { Button, Collapse, Container, Row } from "reactstrap";

import { useState } from "react";

import {
  getButtons,
  getStatus,
} from "../../../../components/StatusButtonsPayments/paymentControl";
import { paymentHandle } from "functions/paymentHandle";
import classNames from "classnames";

export const ModalStudent = ({
  student,
  paymentDispatch,
  className,
  disableControls = 0,
}) => {
  const [commentCollapse, setCollapse] = useState(false);
  const [comment, setComment] = useState({ text: null });

  const toggleCollapse = () => {
    setComment({ text: student.comment });
    setCollapse(!commentCollapse);
  };

  function commentInsert() {
    fetch(
      `${process.env.REACT_APP_API_HOST}/api/schedule/comment/${student.id}`,
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(comment),
      }
    ).then(toggleCollapse);
  }

  const classes = classNames("mb-4", className);

  return (
    <Container fluid className={classes}>
      <Row className="mb-2 student-modal-row">
        <div type={"name"}>
          {student.first_name} {student.last_name}
        </div>
        {getStatus(student.payment_status)}
        {!disableControls && (
          <Button color="primary" onClick={toggleCollapse}>
            <i className="fa-solid fa-comment-medical"></i>
          </Button>
        )}
      </Row>

      {!disableControls && (
        <Row>
          {getButtons(student.payment_status, (payment_status) =>
            paymentHandle(
              () =>
                paymentDispatch({
                  type: "updateDebtInModal",
                  id: student.id,
                  payment_status,
                }),
              { id: student.id, payment_status }
            )
          )}
        </Row>
      )}
      {student.payment_status !== null && !disableControls && (
        <>
          <Row className="mt-2">
            {commentCollapse && (
              <>
                <Button className="green-bg" onClick={commentInsert}>
                  Сохранить
                </Button>
                <Button color="danger" onClick={toggleCollapse}>
                  Отменить
                </Button>
              </>
            )}
          </Row>
          <Row>
            <Collapse isOpen={commentCollapse}>
              <textarea
                value={comment.text === null ? "" : comment.text}
                onChange={(e) => {
                  setComment({ text: e.target.value });
                }}
                maxLength="140"
                style={{ resize: "none" }}
                cols={26}
                rows={5}
                className="mt-2"
              ></textarea>
            </Collapse>
          </Row>
        </>
      )}
    </Container>
  );
};
