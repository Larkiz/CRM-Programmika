import { Dialog, ListSubheader } from "@mui/material";

import { Debt } from "./Debt";
import { ModalBody } from "@/commonComponents/Modal/ModalTemplate";
import { ModalTitle } from "@/commonComponents/Modal/ModalTemplate";

export const DebtModal = ({ handleClose, open, data, paymentDispatch }) => {
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <ModalTitle toggle={handleClose}>
        {data !== null && (
          <>
            {data.first_name} {data.last_name}
          </>
        )}
      </ModalTitle>
      <ModalBody sx={{ width: "auto", padding: "24px 5px" }}>
        {data !== null &&
          data.debts.map((debt, key) => {
            return (
              <div style={{ width: "100%" }} key={key}>
                <ListSubheader style={{ fontSize: 18, fontWeight: 500 }}>
                  {debt.course}
                </ListSubheader>

                <div className="debts-modal">
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
    </Dialog>
  );
};
