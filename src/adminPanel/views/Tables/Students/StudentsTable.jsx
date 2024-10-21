import { AgGridReact } from "ag-grid-react";
import { useFetchTable } from "./hooks/useFetchTable";
import { useRef, useState } from "react";
import "ag-grid-enterprise";

import { toast } from "react-toastify";

import { NewStudent } from "./NewStudent";
import { colDef, defaultColDef } from "./tableOptions";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { Button, Container, Stack, Typography } from "@mui/material";

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
    authFetch(`/students/${data.id}`, {
      method: "put",
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
    <Container maxWidth="sx">
      <Typography className="mb-4" variant="h4">
        Студенты
      </Typography>

      <Stack gap={2} direction={"row"}>
        {!editing ? (
          <>
            <Button variant="contained" onClick={startEdit}>
              Изменить
            </Button>
            <Button
              type="button"
              color="error"
              variant="contained"
              style={{ margin: 0 }}
              onClick={() =>
                deleteRow(gridRef.current.api.getSelectedRows()[0])
              }
            >
              Удалить
            </Button>
          </>
        ) : (
          <>
            <Button
              color="success"
              variant="contained"
              onClick={() => stopEdit("save")}
            >
              Сохранить
            </Button>
            <Button variant="contained" onClick={stopEdit}>
              Отменить
            </Button>
          </>
        )}
      </Stack>

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
    </Container>
  );
};
