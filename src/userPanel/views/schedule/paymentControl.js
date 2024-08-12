export function getStatus(payment_status) {
  if (payment_status === 0) {
    return (
      <div className="payment-status payment-status-false">Не оплачено</div>
    );
  }
  if (payment_status === 1) {
    return <div className="payment-status payment-status-true">Оплачено</div>;
  }
  if (payment_status === -1 || payment_status === null) {
    return <div className="payment-status payment-status-null">Не пришел</div>;
  }
}
