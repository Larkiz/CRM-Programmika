import { Button, Typography } from "@mui/material";

export function PaymentButtons({ paymentStatus, onClick, sx }) {
  if (paymentStatus === 0) {
    return (
      <>
        <Button
          variant="contained"
          color="success"
          size="small"
          className="green-bg"
          sx={{ textTransform: "none", ...sx }}
          onClick={() => onClick(1)}
        >
          Оплатил
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{ textTransform: "none", maxWidth: "max-content", ...sx }}
          onClick={() => onClick(-1)}
        >
          Не пришел
        </Button>
      </>
    );
  } else {
    return null;
  }
}

export function PaymentStatus({ status, sx }) {
  const style = { textAlign: "center", marginLeft: 0 };
  if (status === 0) {
    return (
      <Typography
        sx={{ fontSize: 12, ...style, ...sx }}
        className="payment-status payment-status-false"
        variant="body2"
      >
        Не оплачено
      </Typography>
    );
  }
  if (status === 1) {
    return (
      <Typography
        sx={{ fontSize: 12, ...style, ...sx }}
        className="payment-status payment-status-true"
        variant="body2"
      >
        Оплачено
      </Typography>
    );
  }
  if (status === -1 || status === null) {
    return (
      <Typography
        sx={{ fontSize: 13, ...style, ...sx }}
        className="payment-status payment-status-null"
        variant="body2"
      >
        Не пришел
      </Typography>
    );
  }
}
