import { Button } from "reactstrap";

export function getButtons(payment_status, onClick) {
  if (payment_status === 0) {
    return (
      <>
        <Button className="payment-btn green-bg" onClick={() => onClick(1)}>
          Оплатил
        </Button>

        <Button className="payment-btn" onClick={() => onClick(-1)}>
          Не пришел
        </Button>
      </>
    );
  } else {
    return null;
  }
}

export function getStatus(payment_status) {
  const centeredText = { textAlign: "center" };
  const style = { marginLeft: 0 };
  if (payment_status === 0) {
    return (
      <div
        style={{ ...style, ...centeredText }}
        className="payment-status payment-status-false"
      >
        Не оплачено
      </div>
    );
  }
  if (payment_status === 1) {
    return (
      <div
        style={{ ...style, ...centeredText }}
        className="payment-status payment-status-true"
      >
        Оплачено
      </div>
    );
  }
  if (payment_status === -1 || payment_status === null) {
    return (
      <div
        style={{ ...style, ...centeredText }}
        className="payment-status payment-status-null"
      >
        Не пришел
      </div>
    );
  }
}
