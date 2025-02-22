import { authFetch } from "@/adminPanel/functions/authFetch";

export function paymentHandle(dispatch, { id, payment_status }) {
  let path = `/payments/payment_history`;
  let method = "put";

  authFetch(path, {
    method: method,

    body: JSON.stringify({ id, payment_status }),
  }).then(() => {
    dispatch();
  });
}
