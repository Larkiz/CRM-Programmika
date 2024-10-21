export function debtFilter(i, filter) {
  const name = new RegExp(filter.name, "i");
  const fullName = i.first_name + " " + i.last_name;

  if (
    (filter.course === "" ||
      (filter.course !== "" && filter.course === i.course)) &&
    (filter.name === "" || (filter.name !== "" && name.test(fullName)))
  )
    return true;
}
export const filterData = (tableData, filter) => {
  if (filter.name !== "" || filter.course !== "") {
    const filteredData = tableData.filter((i) => debtFilter(i, filter));

    return filteredData;
  } else {
    return tableData;
  }
};
export const studentsColumns = [
  {
    field: "id",
    headerName: "id",
    headerAlign: "left",
    disableColumnMenu: true,
    width: 70,
  },
  {
    field: "first_name",
    headerName: "Имя",
    width: 150,

    headerAlign: "left",
    disableColumnMenu: true,
  },
  {
    field: "last_name",
    headerName: "Фамилия",
    width: 170,

    headerAlign: "left",
    disableColumnMenu: true,
  },
  {
    field: "course",
    headerName: "Курс",
    type: "text",
    width: 170,

    headerAlign: "left",
    disableColumnMenu: true,
  },
  {
    field: "visited",
    headerName: "Посещено",
    type: "number",
    width: 130,

    headerAlign: "left",
    align: "left",
    disableColumnMenu: true,
  },
  {
    field: "paid_total",
    headerName: "Оплачено",
    type: "number",
    width: 130,

    headerAlign: "left",
    align: "left",
    disableColumnMenu: true,
  },
  {
    field: "not_paid",
    headerName: "Не оплачено",
    type: "number",
    width: 130,

    headerAlign: "left",
    align: "left",
    disableColumnMenu: true,
  },
  {
    field: "omissions",
    headerName: "Пропущено",
    align: "left",
    sortable: true,
    width: 130,

    headerAlign: "left",
    disableColumnMenu: true,
  },
];
