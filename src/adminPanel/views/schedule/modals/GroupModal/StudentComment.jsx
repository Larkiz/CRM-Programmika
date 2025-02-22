import {
  Button,
  Card,
  CardActions,
  Collapse,
  Stack,
  TextField,
} from "@mui/material";

import { CardBody } from "@/commonComponents/Card/Card";
import { TransitionGroup } from "react-transition-group";

export const StudentComment = ({
  isOpen,
  onSave,
  onChange,
  value,
  onCancel,
}) => {
  return (
    <TransitionGroup>
      {isOpen && (
        <Collapse>
          <Card sx={{ width: "fit-content" }}>
            <CardBody>
              <TextField
                sx={{
                  ".MuiInputBase-root": { fontSize: 13, paddingTop: 1 },
                  width: "100%",
                }}
                multiline
                rows={5}
                variant="filled"
                placeholder="Комментарий"
                onChange={(e) => {
                  onChange(e);
                }}
                value={value === null ? "" : value}
              />
            </CardBody>
            <CardActions>
              <Stack direction={"row"} spacing={1}>
                <Button
                  className="green-bg"
                  variant="contained"
                  color="success"
                  onClick={onSave}
                >
                  Сохранить
                </Button>
                <Button variant="contained" onClick={onCancel}>
                  Отменить
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Collapse>
      )}
    </TransitionGroup>
  );
};
