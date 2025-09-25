import { useState } from "react";

import { paymentHandle } from "@/functions/paymentHandle";

import { authFetch } from "@/adminPanel/functions/authFetch";
import { Button, Stack, Typography } from "@mui/material";
import { PaymentStatus } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { PaymentButtons } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { StudentComment } from "./StudentComment";

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
    <Stack sx={{ p: 1 }} gap={1}>
      <Stack alignItems={"center"} direction={"row"} gap={1}>
        <Typography sx={{ fontSize: 14 }}>
          {student.first_name} {student.last_name}
        </Typography>
        <PaymentStatus status={student.payment_status} />

        {!disableControls && student.payment_status !== -1 && (
          <Button
            sx={{ minWidth: 40, width: 40 }}
            color="primary"
            variant="contained"
            onClick={toggleCollapse}
          >
            <i className="fa-solid fa-comment-medical"></i>
          </Button>
        )}
      </Stack>

      {!disableControls && (
        <Stack direction={"row"} gap={1}>
          <PaymentButtons
            paymentStatus={student.payment_status}
            onClick={(payment_status) =>
              paymentHandle(
                () =>
                  paymentDispatch({
                    type: "updateDebtInModal",
                    id: student.id,
                    payment_status,
                  }),
                { id: student.id, payment_status }
              )
            }
            sx={{ fontSize: 12, width: "fit-content", p: 0.5 }}
          />
        </Stack>
      )}
      {student.payment_status !== null && !disableControls && (
        <StudentComment
          isOpen={commentCollapse}
          onSave={commentInsert}
          onChange={(e) => {
            setComment({ text: e.target.value });
          }}
          onCancel={toggleCollapse}
          value={comment.text === null ? "" : comment.text}
        />
      )}
    </Stack>
  );
};
