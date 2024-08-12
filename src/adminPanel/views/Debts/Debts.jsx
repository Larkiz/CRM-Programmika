import { useEffect, useReducer, useState } from "react";
import { Col, Container, FormGroup, Input, Label } from "reactstrap";

import { paymentReducer } from "adminPanel/reducers/finance/paymentReducer";
import { Debt } from "./Debt";
import { CoursePicker } from "adminPanel/components/CoursePicker/CoursePicker";
function debtFilter(i, filters) {
  const name = new RegExp(filters.name, "i");
  const fullName = i.first_name + " " + i.last_name;

  if (
    (filters.course === "*" ||
      (filters.course !== "*" && filters.course === i.course)) &&
    (filters.name === "" || (filters.name !== "" && name.test(fullName)))
  )
    return true;
}

export const Debts = () => {
  const [debts, paymentDispatch] = useReducer(paymentReducer, null);
  const [filters, setFilters] = useState({
    course: "*",
    name: "",
    groups: [],
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/api/finance/debt`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
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

  return (
    <Container fluid>
      <Col md={3}>
        <FormGroup>
          <Label for="name">Имя</Label>
          <Input
            id="name"
            placeholder="Имя"
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
            }}
            type="text"
            className="schedule-input border"
          />
        </FormGroup>
      </Col>
      <Col md={3}>
        <CoursePicker
          courses={filters.groups}
          onChange={(e) => {
            setFilters({ ...filters, course: e.target.value });
          }}
        />
      </Col>

      {debts &&
        debts.map((debt, key) => {
          if (debtFilter(debt, filters)) {
            return (
              <Debt debt={debt} paymentDispatch={paymentDispatch} key={key} />
            );
          }
          return false;
        })}
    </Container>
  );
};
