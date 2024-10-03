import { AgGridReact } from "ag-grid-react";
import { useFetchTable } from "./hooks/useFetchTable";
import { useRef, useState } from "react";
import "ag-grid-enterprise";
import { Button, Card, CardHeader, Col, Row } from "reactstrap";

import { toast } from "react-toastify";

import { NewStudent } from "./NewStudent";
import { colDef, defaultColDef } from "./tableOptions";

export const StudentsTable = () => {
  const [tableData, addNew, deleteRow] = useFetchTable("students");
  const [editing, setEditing] = useState(false);

  const gridRef = useRef();

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
        type="button"
        className="red-bg"
        style={{ backgroundColor: "#c53939", margin: 0 }}
        onClick={() => deleteRow(gridRef.current.api.getSelectedRows()[0])}
      >
        Удалить
      </Button>
      {!editing ? (
        <Button
          type="button"
          className="green-bg"
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
      <NewStudent onSubmit={addNew} />
    </Card>
  );
};
