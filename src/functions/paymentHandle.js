export function paymentHandle(dispatch, { id, payment_status }) {
  let url = `${process.env.REACT_APP_API_HOST}/api/payments/payment_history`;
  let method = "put";

  fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      id,

      payment_status,
    }),
  }).then(() => {
    dispatch();
  });
}
