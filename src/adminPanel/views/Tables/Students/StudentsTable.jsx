import { AgGridReact } from "ag-grid-react";
import { useFetchTable } from "./hooks/useFetchTable";
import { useContext, useEffect, useRef, useState } from "react";
import "ag-grid-enterprise";
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { toast } from "react-toastify";
import { CoursePicker } from "adminPanel/components/CoursePicker/CoursePicker";

const defaultColDef = {
  floatingFilter: true,
  filter: "agTextColumnFilter",
  editable: true,
};

const colDef = [
  { field: "id", filter: true, editable: false },
  { field: "first_name", headerName: "Имя" },
  { field: "last_name", headerName: "Фамилия" },
  { field: "course", filter: "agSetColumnFilter", headerName: "Курс" },
  { field: "city", headerName: "Город" },
  {
    field: "birthday",
    filter: "agDateColumnFilter",
    cellEditor: "agDateStringCellEditor",
    headerName: "Дата рождения",
  },
  { field: "phone_number", headerName: "Номер телефона" },
  { field: "parent_phone", headerName: "Номер тел. родителей" },
];
export const StudentsTable = () => {
  const [tableData, addNew, deleteRow] = useFetchTable("students");
  const [editing, setEditing] = useState(false);

  const gridRef = useRef();
  const { coursesNames } = useContext(GroupsContext);

  const { register, watch, handleSubmit } = useForm();
  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  function startEdit() {
    const row = gridRef.current.api.getSelectedNodes()[0];
    if (row) {
      gridRef.current.api.startEditingCell({
        rowIndex: row.rowIndex,
        colKey: "id",
      });
    } else {
      toast.error("Выберите строку");
    }
  }

  function update(data) {
    fetch(`${process.env.REACT_APP_API_HOST}/api/students/${data.id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    }).then(() => toast.success("Успешно обновлено"));
  }

  function stopEdit(action = true) {
    if (action === "save") {
      gridRef.current.api.stopEditing(false);
    } else {
      gridRef.current.api.stopEditing(true);
    }
  }

  return (
    <Card>
      <CardHeader className="border-0">
        <h1 className="mb-0">Студенты</h1>
      </CardHeader>
      <Button
        style={{ backgroundColor: "#c53939", margin: 0 }}
        onClick={() => deleteRow(gridRef.current.api.getSelectedRows()[0])}
      >
        Удалить
      </Button>
      {!editing ? (
        <Button
          style={{ backgroundColor: "#439358", margin: 0 }}
          onClick={startEdit}
        >
          Изменить
        </Button>
      ) : (
        <Row>
          <Col>
            <Button
              style={{ backgroundColor: "#439358" }}
              onClick={() => stopEdit("save")}
            >
              Сохранить
            </Button>
            <Button onClick={stopEdit}>Отменить</Button>
          </Col>
        </Row>
      )}

      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          ref={gridRef}
          editType={"fullRow"}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={false}
          rowData={tableData}
          columnDefs={colDef}
          rowSelection={"single"}
          onRowEditingStarted={() => {
            setEditing(true);
          }}
          onRowEditingStopped={() => {
            setEditing(false);
          }}
          onCellValueChanged={(data) => {
            update(data.data);
          }}
          suppressCellFocus
        />
      </div>
      <Container fluid>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="first_name">Имя</Label>
              <input
                className="form-control"
                id="first_name"
                {...register("first_name", { required: true })}
                placeholder="Имя"
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="last_name">Фамилия</Label>
              <input
                className="form-control"
                id="last_name"
                {...register("last_name", { required: true })}
                placeholder="Фамилия"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <CoursePicker
                courses={coursesNames}
                register={{ ...register("course", { required: true }) }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="phone_number">Номер телефона</Label>
              <input
                className="form-control"
                id="phone_number"
                {...register("phone_number")}
                placeholder="Номер тел."
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="parent_phone">Тел. родитилей</Label>
              <input
                className="form-control"
                id="parent_phone"
                {...register("parent_phone")}
                placeholder="Тел. родителей"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="city">Город</Label>
              <input
                className="form-control"
                id="city"
                {...register("city")}
                placeholder="Город"
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="birthday">Дата рождения</Label>
              <input
                className="form-control"
                type="date"
                id="birthday"
                {...register("birthday")}
                placeholder="Дата рождения"
              />
            </FormGroup>
          </Col>
        </Row>

        <Button onClick={handleSubmit((data) => addNew(data))}>Добавить</Button>
      </Container>
    </Card>
  );
};
