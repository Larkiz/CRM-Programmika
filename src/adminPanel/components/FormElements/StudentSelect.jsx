import { Box, Checkbox, Container, Stack, Typography } from "@mui/material";

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
      <Stack direction={"row"}>
        <Box flexGrow={1}></Box>

        <Typography sx={{ flexBasis: 0 }} flexGrow={2}>
          Имя
        </Typography>

        <Typography sx={{ flexBasis: 0 }} flexGrow={2}>
          Фамилия
        </Typography>
      </Stack>
      <Stack style={{ height: "300px", overflowY: "scroll" }}>
        {students.length ? (
          students.map((student) => {
            return (
              <label style={{ cursor: "pointer" }} key={student.id}>
                <Stack
                  sx={{ ".MuiTypography-root": { fontSize: 15 } }}
                  alignItems={"center"}
                  direction={"row"}
                >
                  <Box flexGrow={0.7}>
                    <Checkbox
                      checked={checkStudentOnAdd(student)}
                      size="small"
                      onChange={(e) => onChange(e, student)}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{ flexBasis: 0 }}
                    flexGrow={2}
                  >
                    {student.first_name}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ flexBasis: 0 }}
                    flexGrow={2}
                  >
                    {student.last_name}
                  </Typography>
                </Stack>
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
