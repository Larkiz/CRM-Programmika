import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
export const CoursePicker = ({
  courses,
  onChange,
  asFilter = false,
  value,
  multiple = false,
  sx,
}) => {
  return (
    <FormControl sx={{ ...sx, maxWidth: "100%" }}>
      <InputLabel id="course">Курс</InputLabel>
      <Select
        label="Курс"
        multiple={multiple}
        id="course"
        value={value}
        sx={{ minWidth: 147, maxWidth: "100%" }}
        onChange={onChange ? onChange : null}
        renderValue={(value) => {
          if (value) {
            return (
              <Box sx={{ display: "flex", gap: 1 }}>
                {multiple ? value.join(", ") : value}
              </Box>
            );
          }
        }}
      >
        {asFilter && (
          <MenuItem value={""} key={"*"}>
            Без фильтра
          </MenuItem>
        )}
        {courses
          ? courses.map((group, key) => {
              return (
                <MenuItem value={group} key={key}>
                  {multiple && value.includes(group) && <DoneIcon />}
                  {group}
                </MenuItem>
              );
            })
          : null}
      </Select>
    </FormControl>
  );
};
