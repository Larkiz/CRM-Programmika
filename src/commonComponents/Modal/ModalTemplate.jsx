import { Box, Button, DialogContent, DialogTitle, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const ModalTitle = ({ children, toggle, sx = {} }) => {
  return (
    <DialogTitle sx={sx}>
      <Stack direction={"row"}>
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <Button sx={{ alignItems: "flex-start" }} onClick={toggle}>
          <CloseIcon />
        </Button>
      </Stack>
    </DialogTitle>
  );
};

export const ModalBody = ({ children, width, sx }) => {
  return (
    <DialogContent sx={{ width: width, ...sx }}>
      <Box className="modal-custom">{children}</Box>
    </DialogContent>
  );
};
