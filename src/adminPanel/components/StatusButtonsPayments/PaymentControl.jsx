import { Box, Button } from "@mui/material";

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
      <Box
        sx={{ fontSize: 13, ...style, ...sx }}
        className="payment-status payment-status-false"
      >
        Не оплачено
      </Box>
    );
  }
  if (status === 1) {
    return (
      <Box
        sx={{ fontSize: 13, ...style, ...sx }}
        className="payment-status payment-status-true"
      >
        Оплачено
      </Box>
    );
  }
  if (status === -1 || status === null) {
    return (
      <Box
        sx={{ ...style, ...sx }}
        className="payment-status payment-status-null"
      >
        Не пришел
      </Box>
    );
  }
}
