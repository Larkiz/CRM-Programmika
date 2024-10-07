import { useContext, useEffect, useState } from "react";
import { Container, Label, Row, Table } from "reactstrap";
import { TablePagination } from "./TablePagination/TablePagination";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { authFetch } from "../functions/authFetch";

export const StudentStats = ({ filterDate }) => {
  const [tableData, setTableData] = useState([]);

  const [filter, setFilter] = useState({ name: "", course: "*", page: 1 });

  const { coursesNames } = useContext(GroupsContext);

  useEffect(() => {
    authFetch(
      `/students/stats?month=${filterDate.month}&year=${filterDate.year}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setTableData(resJson);
        setFilter({ ...filter, page: 1 });
      });
  }, [filterDate]);

  useEffect(() => {
    setFilter({ ...filter, page: 1 });
  }, [filter.course]);

  function debtFilter(i) {
    const name = new RegExp(filter.name, "i");
    const fullName = i.first_name + " " + i.last_name;

    if (
      (filter.course === "*" ||
        (filter.course !== "*" && filter.course === i.course)) &&
      (filter.name === "" || (filter.name !== "" && name.test(fullName)))
    )
      return true;
  }

  const filterData = () => {
    if (filter.name !== "" || filter.course !== "*") {
      const filteredData = tableData.filter((i) => debtFilter(i));

      return filteredData;
    } else {
      return tableData;
    }
  };

  const start = filter.page * 5 - 5;
  const end = filter.page * 5;
  const length = filterData().length;

  return (
    <>
      {/* <h2 className="mt-4 mb-3">Статистика студентов</h2> */}
      <Container fluid>
        <Row style={{ gap: 20, margin: 0 }}>
          <div>
            <Label for="course">Имя</Label>
            <input
              className="form-control"
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              type="text"
              placeholder="Имя"
            />
          </div>
          <CoursePicker
            courses={coursesNames}
            onChange={(e) => {
              setFilter({ ...filter, course: e.target.value });
            }}
          />
        </Row>

        <Table className="shadow mb-4" responsive hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Курс</th>
              <th>Посещено</th>
              <th>Оплачено</th>
              <th>Не оплачено</th>
              <th>Пропущено</th>
            </tr>
          </thead>
          <tbody style={{ height: "225px" }}>
            {tableData.length ? (
              filterData()
                .slice(start, end)
                .map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.course}</td>
                      <td>{item.visited}</td>
                      <td>{item.paid_total}</td>
                      <td>{item.not_paid}</td>
                      <td>{item.omissions}</td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td style={{ fontSize: 16 }}>Нет данных</td>
              </tr>
            )}
          </tbody>
        </Table>
        <TablePagination
          page={filter.page}
          start={start + 1}
          end={end}
          length={length}
          perPage={5}
          prevPage={() =>
            setFilter({
              ...filter,
              page: filter.page - 1,
            })
          }
          nextPage={() =>
            setFilter({
              ...filter,
              page: filter.page + 1,
            })
          }
        />
      </Container>
    </>
  );
};
