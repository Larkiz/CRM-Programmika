import { useEffect, useReducer, useState } from "react";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";

import { FormElement } from "../../components/FormElements/FormElement";

import { DebtModal } from "./DebtModal/DebtModal";
import { debtsReducer } from "adminPanel/reducers/finance/debtsReducer";
import { Earnings } from "./Earnings/Earnings";
import { useChartData } from "./hooks/useChartData";
import { MonthController } from "adminPanel/components/MonthController/MonthController";
import { authFetch } from "../Index/functions/authFetch";

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

  const [modal, setModal] = useState({ show: false, data: null });
  const handleModalOpen = (data) => {
    setModal({ show: true, data: data });
  };
  const handleModalClose = () => {
    setModal({ show: false, data: null });
  };
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
        handleClose={handleModalClose}
        show={modal.show}
        data={modal.data}
        paymentDispatch={paymentDispatch}
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
                    <Button
                      color="primary"
                      onClick={() => handleModalOpen(debt)}
                    >
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
