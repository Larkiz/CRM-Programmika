import { useContext, useEffect, useState } from "react";

import { GroupsContext } from "adminPanel/Context/GroupsContext";
import { CoursePicker } from "adminPanel/components/FormElements/CoursePicker";
import { authFetch } from "../functions/authFetch";
import { Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { filterData, studentsColumns } from "./options";

export const StudentStats = ({ filterDate }) => {
  const [tableData, setTableData] = useState([]);

  const [filter, setFilter] = useState({ name: "", course: "" });

  const { coursesNames } = useContext(GroupsContext);

  useEffect(() => {
    authFetch(
      `/students/stats?month=${filterDate.month}&year=${filterDate.year}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setTableData(resJson);
      });
  }, [filterDate]);

  return (
    <>
      <Stack className="mb-3" direction={"row"} style={{ gap: 20, margin: 0 }}>
        <TextField
          id="outlined-number"
          label="Имя"
          type="text"
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        {coursesNames && (
          <CoursePicker
            courses={coursesNames}
            value={filter.course}
            asFilter={true}
            onChange={(e) => {
              setFilter({ ...filter, course: e.target.value });
            }}
          />
        )}
      </Stack>
      <DataGrid
        className="mb-3"
        sx={{ minHeight: 350, maxWidth: "100%", overflowX: "scroll" }}
        rows={filterData(tableData, filter)}
        columns={studentsColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </>
  );
};
