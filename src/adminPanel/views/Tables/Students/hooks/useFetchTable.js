import { authFetch } from "@/adminPanel/functions/authFetch";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        toast.success("Студент добавлен");
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
          toast.success("Студент удален");
        });
    }
  }

  return [tableData, addNew, deleteRow];
};
