export const paymentReducer = (state, action) => {
  const { type, id, payment_status } = action;
  switch (type) {
    case "set":
      return action.data;
    case "updateDebtInModal":
      return state.map((item) => {
        if (item.id === id) {
          item.payment_status = payment_status;
          return item;
        }
        return item;
      });

    case "updateDebt":
      return state.map((item) => {
        item.debts = item.debts.map((debt) => {
          if (debt.id === id) {
            debt.payment_status = payment_status;
          }
          return debt;
        });
        return item;
      });

    default:
      return state;
  }
};
