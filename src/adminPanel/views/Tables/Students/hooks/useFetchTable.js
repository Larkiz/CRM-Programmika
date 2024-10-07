/* eslint-disable react-hooks/exhaustive-deps */
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { useEffect, useState } from "react";

export const useFetchTable = (tableName) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    authFetch(`/${tableName}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.message) throw resJson.message;
        setTableData(resJson);
      })
      .catch(console.log);
  }, []);

  function addNew(data) {
    authFetch(`/${tableName}`, {
      method: "post",

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setTableData([...tableData, { id: resJson.insertedId, ...data }]);
      });
  }

  function deleteRow(data) {
    if (window.confirm("Вы уверены что хотите удалить запись?")) {
      authFetch(`/${tableName}/${data.id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((resJson) => {
          setTableData(
            tableData.filter((student) => student.id !== resJson.deleted)
          );
        });
    }
  }

  return [tableData, addNew, deleteRow];
};
