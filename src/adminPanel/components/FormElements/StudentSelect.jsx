import {
  Box,
  Checkbox,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";

const textStudentSx = { fontSize: { xs: 13, sm: 16 } };
export const StudentsSelect = ({ students, onChange, value }) => {
  function checkStudentOnAdd(student) {
    return value.findIndex((i) => i.id === student.id) >= 0 ? true : false;
  }
  return (
    <Container
      maxWidth={false}
      sx={{
        mt: 1,
        mb: 3,
        border: "1px solid #6c757d",
        borderRadius: ".25rem",
      }}
    >
      <Grid2 container sx={{ pt: 1 }} alignItems={"center"}>
        <Grid2 size={2}></Grid2>
        <Grid2 size={5}>
          <Typography>Имя</Typography>
        </Grid2>
        <Grid2 size={5}>
          <Typography>Фамилия</Typography>
        </Grid2>
      </Grid2>
      <Stack style={{ height: "300px", overflowY: "scroll" }}>
        {students.length ? (
          students.map((student) => {
            return (
              <label style={{ cursor: "pointer" }} key={student.id}>
                <Grid2 container alignItems={"center"}>
                  <Grid2 size={2}>
                    <Checkbox
                      checked={checkStudentOnAdd(student)}
                      size="small"
                      onChange={(e) => onChange(e, student)}
                    />
                  </Grid2>
                  <Grid2 size={5}>
                    <Typography variant="body1" sx={{ ...textStudentSx }}>
                      {student.first_name}
                    </Typography>
                  </Grid2>
                  <Grid2 size={5}>
                    <Typography variant="body1" sx={{ ...textStudentSx }}>
                      {student.last_name}
                    </Typography>
                  </Grid2>
                </Grid2>
              </label>
            );
          })
        ) : (
          <Typography sx={{ p: 2 }}>Список студентов пуст</Typography>
        )}
      </Stack>
    </Container>
  );
};
