export const debtsReducer = (state, action) => {
  const { type, id, payment_status } = action;
  switch (type) {
    case "set":
      return action.data;
    case "updateDebt":
      const newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        const studentDebts = newState[i].debts;
        for (let j = 0; j < studentDebts.length; j++) {
          const debts = studentDebts[j].debts;

          for (let k = 0; k < debts.length; k++) {
            const debt = debts[k];
            if (debt.id === id) {
              debt.payment_status = payment_status;
            }
          }
        }
      }

      return newState;

    default:
      return state;
  }
};
