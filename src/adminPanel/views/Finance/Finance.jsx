import { FinanceCard } from "./FInanceCard";
import { FormElement } from "adminPanel/components/FormElements/FormElement";
import { useForm } from "react-hook-form";
import { useEffect, useReducer, useState } from "react";
import { monthFilterReducer } from "adminPanel/reducers/filters/monthFilterReducer";
import { numberIsNegative } from "functions/numberIsNegatibe";
import { OperationCell } from "./OperationCell";
import { toast } from "react-toastify";
import { authFetch } from "../Index/functions/authFetch";
import { MonthController } from "commonComponents/MonthController/MonthController";
import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";

export const Finance = () => {
  const { register, handleSubmit } = useForm();
  const [finances, setFinances] = useState([]);

  const [filterDate, dispatchMonthFilter] = useReducer(monthFilterReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [selectedId, setSelected] = useState(null);

  useEffect(() => {
    authFetch(`/finance?month=${filterDate.month}&year=${filterDate.year}`)
      .then((res) => res.json())
      .then((data) => setFinances(data));

    // eslint-disable-next-line
  }, [filterDate]);

  function deleteRow() {
    if (window.confirm("Удалить строку?")) {
      const value = finances.operations.filter(
        (item) => item.id === selectedId
      )[0].amount;

      authFetch(`/finance/${selectedId}`, { method: "delete" }).then(() => {
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
    authFetch("/finance", {
      method: "POST",
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
  const cardBorder = { border: "1px solid rgba(0, 0, 0, .125)" };
  return (
    <Container maxWidth="sx">
      <Stack sx={{ flexDirection: { xs: "column", sm: "row" } }} gap={2}>
        <Stack>
          <Stack spacing={2} direction={"row"}>
            <FinanceCard sx={cardBorder} value={finances.income}>
              Доход
            </FinanceCard>

            <FinanceCard
              sx={cardBorder}
              value={finances.earnings}
              type="earning"
            >
              Прибыль
            </FinanceCard>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={4} direction={"row"}>
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
            </Stack>
            <Box>
              <Button
                variant="contained"
                onClick={handleSubmit((data) => operationPost(data))}
              >
                Добавить
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack flexGrow={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteRow(selectedId)}
            disabled={finances.operations && !finances.operations.length}
            className="mb-2"
          >
            Удалить
          </Button>
          <Table
            style={{
              width: "100%",
              borderRadius: "0.5rem",
            }}
          >
            <TableHead>
              <TableRow>
                <th
                  style={{
                    backgroundColor: "#fff",
                    color: "rgb(58, 130, 214)",
                    fontSize: 20,
                  }}
                >
                  Операции
                </th>
              </TableRow>
            </TableHead>
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
        </Stack>
      </Stack>
      <MonthController
        fixedBottom
        filterDate={filterDate}
        dispatch={dispatchMonthFilter}
      />
    </Container>
  );
};
