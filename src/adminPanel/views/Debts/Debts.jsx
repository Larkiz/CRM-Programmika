import { useEffect, useReducer, useState } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

import { FormElement } from "../../components/FormElements/FormElement";

import { debtsReducer } from "adminPanel/reducers/finance/debtsReducer";
import { Earnings } from "./Earnings/Earnings";
import { useChartData } from "./hooks/useChartData";
import { authFetch } from "../Index/functions/authFetch";
import { MonthController } from "commonComponents/MonthController/MonthController";
import { DebtModal } from "./DebtModal/DebtModal";
import { Button } from "@mui/material";
import { useModalControl } from "commonComponents/Modal/useModal";
import { ModalTemplate } from "commonComponents/Modal/ModalTemplate";

function debtFilter(i, filters) {
  const name = new RegExp(filters.name, "i");
  const fullName = i.first_name + " " + i.last_name;

  if (filters.name === "" || (filters.name !== "" && name.test(fullName)))
    return true;
}

export const Debts = () => {
  const [debts, paymentDispatch] = useReducer(debtsReducer, null);
  const [filters, setFilters] = useState({
    name: "",
    groups: [],
  });

  useEffect(() => {
    authFetch("/payments/debt")
      .then((res) => res.json())
      .then((data) => {
        paymentDispatch({ type: "set", data: data });
      });
  }, []);

  useEffect(() => {
    if (debts) {
      let groups = debts.map((debt) => debt.course);

      groups = groups.filter((group, index) => index === groups.indexOf(group));

      setFilters({ ...filters, groups: groups });
    }
  }, [debts]);

  const { modalData, modalClose, modalOpen } = useModalControl();

  const [
    chartEarningsData,
    chartDebtsData,
    options,
    filterDate,
    dispatchMonthFilter,
  ] = useChartData();
  return (
    <Container fluid>
      <DebtModal
        open={modalData.show}
        data={modalData.data}
        paymentDispatch={paymentDispatch}
        handleClose={modalClose}
      />

      <Earnings
        chartEarningsData={chartEarningsData}
        chartDebtsData={chartDebtsData}
        options={options}
        filterDate={filterDate}
        dispatchMonthFilter={dispatchMonthFilter}
      />
      <MonthController
        style={{ margin: "0 auto" }}
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
      <FormElement
        md={3}
        onChange={(e) => {
          setFilters({ ...filters, name: e.target.value });
        }}
        id={"name"}
      >
        Имя
      </FormElement>

      <div className="debts">
        {debts &&
          debts.map((debt, key) => {
            if (debtFilter(debt, filters)) {
              return (
                <Card key={key} className="p-3 mb-1 ">
                  <CardHeader>
                    {debt.first_name} {debt.last_name}
                  </CardHeader>
                  <CardBody>
                    <Button variant="contained" onClick={() => modalOpen(debt)}>
                      Посмотреть
                    </Button>
                  </CardBody>
                </Card>
              );
            }
            return false;
          })}
      </div>
    </Container>
  );
};
