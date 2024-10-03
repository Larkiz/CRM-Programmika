import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { Debt } from "../Debt";

export const DebtModal = ({ handleClose, show, data, paymentDispatch }) => {
  return (
    <Modal size="xl" isOpen={show} toggle={handleClose} backdrop={true}>
      <ModalHeader toggle={handleClose}>
        {data !== null && (
          <>
            {data.first_name} {data.last_name}
          </>
        )}
      </ModalHeader>
      <ModalBody>
        {data !== null &&
          data.debts.map((debt, key) => {
            return (
              <div key={key}>
                <p style={{ fontSize: 18, fontWeight: 500 }}>{debt.course}</p>
                <div className="debts">
                  {debt.debts.map((debt, key) => {
                    return (
                      <Debt
                        key={key}
                        debt={debt}
                        paymentDispatch={paymentDispatch}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
      </ModalBody>
    </Modal>
  );
};
