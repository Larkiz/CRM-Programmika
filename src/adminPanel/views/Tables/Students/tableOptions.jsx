import { CourseEdit } from "@/adminPanel/views/Tables/Students/CourseEdit/CourseEdit";

export const defaultColDef = {
  floatingFilter: true,
  filter: "agTextColumnFilter",
  editable: true,
};

export const colDef = [
  { field: "id", filter: true, editable: false },
  { field: "first_name", headerName: "Имя" },
  { field: "last_name", headerName: "Фамилия" },
  {
    field: "course",
    filter: "agSetColumnFilter",
    headerName: "Курс",
    cellEditor: CourseEdit,
  },
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
