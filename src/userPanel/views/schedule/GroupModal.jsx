import { useEffect, useState } from "react";

import { Dialog, Paper, Stack, Typography } from "@mui/material";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";
import { PaymentStatus } from "@/adminPanel/components/StatusButtonsPayments/PaymentControl";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";
import { CardTitle } from "@/commonComponents/Card/Card";
import { authFetch } from "@/userPanel/functions/authFetch";

export const GroupModal = ({ handleClose, id, show }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (show) {
      authFetch(`/schedule/lesson/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    // eslint-disable-next-line
  }, [show]);

  return (
    <Dialog fullWidth open={show} onClose={handleClose}>
      <ModalTitle toggle={handleClose}>{data?.course}</ModalTitle>

      <ModalBody>
        <Stack spacing={2} sx={{ p: 1 }}>
          <Stack alignItems={"center"} spacing={1} direction={"row"}>
            <Typography>Дата: </Typography>
            <Typography variant="subtitle2"> {data?.date}</Typography>
          </Stack>
          <Stack direction={"row"}>
            <PaymentStatus
              sx={{ fontSize: 16 }}
              status={data?.payment_status}
            />
          </Stack>
          <Paper sx={{ maxWidth: 400, p: 2 }} elevation={2}>
            <CardTitle sx={{ m: 0 }} variant="h6">
              Комментарий
            </CardTitle>
            <Typography component={"pre"}>
              {data?.comment ? data.comment : "Нет комментария"}
            </Typography>
          </Paper>
        </Stack>
      </ModalBody>
    </Dialog>
  );
};
