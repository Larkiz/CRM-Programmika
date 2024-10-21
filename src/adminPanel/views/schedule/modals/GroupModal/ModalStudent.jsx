import { Collapse, Row } from "reactstrap";

import { useState } from "react";

import {
  getButtons,
  getStatus,
} from "../../../../components/StatusButtonsPayments/paymentControl";
import { paymentHandle } from "functions/paymentHandle";
import classNames from "classnames";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { Button, Stack } from "@mui/material";

export const ModalStudent = ({
  student,
  paymentDispatch,

  disableControls = 0,
}) => {
  const [commentCollapse, setCollapse] = useState(false);
  const [comment, setComment] = useState({ text: null });

  const toggleCollapse = () => {
    setComment({ text: student.comment });
    setCollapse(!commentCollapse);
  };

  function commentInsert() {
    authFetch(`/schedule/comment/${student.id}`, {
      method: "post",
      body: JSON.stringify(comment),
    }).then(toggleCollapse);
  }

  return (
    <Stack gap={1}>
      <Stack sx={{ "*": { fontSize: 14 } }} direction={"row"} gap={1}>
        <div type={"name"}>
          {student.first_name} {student.last_name}
        </div>
        {getStatus(student.payment_status)}
        {/* {!disableControls && student.payment_status !== -1 && (
          <Button
            style={{ width: 20 }}
            color="primary"
            variant="contained"
            onClick={toggleCollapse}
          >
            <i className="fa-solid fa-comment-medical"></i>
          </Button>
        )} */}
      </Stack>

      {!disableControls && (
        <Stack direction={"row"} gap={1} className="gap-5">
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
        </Stack>
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
    </Stack>
  );
};
