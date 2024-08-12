/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useFetchTable = (tableName) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/api/${tableName}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.message) throw resJson.message;
        setTableData(resJson);
      })
      .catch(console.log);
  }, []);

  function addNew(data) {
    fetch(`${process.env.REACT_APP_API_HOST}/api/${tableName}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setTableData([...tableData, { id: resJson.insertedId, ...data }]);
      });
  }

  function deleteRow(data) {
    if (window.confirm("Вы уверены что хотите удалить запись?")) {
      fetch(`${process.env.REACT_APP_API_HOST}/api/${tableName}/${data.id}`, {
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
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
