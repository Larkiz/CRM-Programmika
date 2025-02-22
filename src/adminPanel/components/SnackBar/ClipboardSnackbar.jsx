import { Box, IconButton, Snackbar, Typography } from "@mui/material";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { GroupsContext } from "@/adminPanel/Context/GroupsContextProvider";
export function ClipboardSnackbar() {
  const { snackBarOpened, snackBarControl, copiedLesson } =
    useContext(GroupsContext);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => snackBarControl.close()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={snackBarOpened}
      message={
        <Box>
          <Typography>Скопировано</Typography>

          <Typography variant="subtitle2">
            {copiedLesson?.course} {copiedLesson?.time}{" "}
            {copiedLesson?.students.length} Человека
          </Typography>
        </Box>
      }
      action={action}
    />
  );
}
