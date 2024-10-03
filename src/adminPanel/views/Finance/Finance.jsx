import { Button, Col, Container, Row, Table } from "reactstrap";
import { FinanceCard } from "./FInanceCard";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import { MonthController } from "adminPanel/components/MonthController/MonthController";
import { monthFilterReducer } from "adminPanel/reducers/filters/monthFilterReducer";
import { numberIsNegative } from "functions/numberIsNegatibe";
import { OperationCell } from "./OperationCell";
import { toast } from "react-toastify";

export const Finance = () => {
  const { register, handleSubmit } = useForm();
  const [finances, setFinances] = useState([]);

  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [selectedId, setSelected] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_HOST}/api/finance?month=${filterDate.month}&year=${filterDate.year}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setFinances(data));

    // eslint-disable-next-line
  }, [filterDate]);

  function deleteRow() {
    if (window.confirm("Удалить строку?")) {
      const value = finances.operations.filter(
        (item) => item.id === selectedId
      )[0].amount;

      fetch(`${process.env.REACT_APP_API_HOST}/api/finance/${selectedId}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }).then(() => {
        setFinances({
          earnings: finances.earnings - value,
          income: numberIsNegative(value)
            ? finances.income
            : finances.income - value,
          operations: finances.operations.filter(
            (item) => item.id !== selectedId
          ),
        });
        toast.success("Операция удалена");
      });
    }
  }

  function operationPost(newOperation) {
    fetch(`${process.env.REACT_APP_API_HOST}/api/finance`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(newOperation),
    })
      .then((res) => res.json())
      .then((data) => {
        newOperation.id = data.insertId;
        setFinances({
          earnings: finances.earnings + newOperation.amount,
          income: numberIsNegative(newOperation.amount)
            ? finances.income
            : finances.income + newOperation.amount,
          operations: [...finances.operations, newOperation],
        });
      });
  }

  return (
    <Container style={{ marginBottom: 75 }} className="mt-5" fluid>
      <Row>
        <Col>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col>
              <FinanceCard value={finances.income}>Доход</FinanceCard>
            </Col>
            <Col>
              <FinanceCard value={finances.earnings} type="earning">
                Прибыль
              </FinanceCard>
            </Col>
          </Row>
          <Row>
            <Container>
              <Row>
                <FormElement
                  register={{ ...register("name", { required: true }) }}
                >
                  Название
                </FormElement>
                <FormElement
                  register={{
                    ...register("amount", {
                      required: true,
                      valueAsNumber: true,
                    }),
                  }}
                  type={"number"}
                >
                  Сумма
                </FormElement>
              </Row>
              <Row className="mb-4" style={{ paddingLeft: 15 }}>
                <Button
                  color="primary"
                  onClick={handleSubmit((data) => operationPost(data))}
                >
                  Добавить
                </Button>
              </Row>
            </Container>
          </Row>
        </Col>
        <Col>
          <Button
            style={{ backgroundColor: "#c53939", margin: 0, width: "100%" }}
            onClick={() => deleteRow(selectedId)}
            disabled={finances.operations && !finances.operations.length}
            className="mb-2"
          >
            Удалить
          </Button>
          <Table
            style={{
              height: "100%",
              minWidth: 440,
              borderRadius: "0.5rem",
            }}
            responsive
            className="finance-table"
          >
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#fff",
                    color: "rgb(58, 130, 214)",
                    fontSize: 13,
                  }}
                >
                  Операции
                </th>
              </tr>
            </thead>
            <tbody>
              {finances.operations && finances.operations.length ? (
                finances.operations.map((data) => {
                  return (
                    <OperationCell
                      key={data.id}
                      name={data.name}
                      amount={data.amount}
                      onClick={setSelected}
                      selectedId={selectedId}
                      id={data.id}
                    />
                  );
                })
              ) : (
                <tr>
                  <td>
                    <h3 className="center-text">Операции не найдены</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
