import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { NewNote } from "./NewNote";
import { useEffect, useReducer, useState } from "react";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { notesReducer } from "./notesReducer";
import { toast } from "react-toastify";
import { CardTitle } from "commonComponents/Card/Card";
import { CardBody } from "commonComponents/Card/Card";
import { TransitionGroup } from "react-transition-group";

export const Notes = ({ sitePath }) => {
  const [notes, notesDispatch] = useReducer(notesReducer, []);
  const [newPending, setNewPeding] = useState(false);

  function setNewPedingToggle() {
    setNewPeding(!newPending);
  }

  useEffect(() => {
    authFetch(`/notes/${sitePath}`)
      .then((res) => res.json())
      .then((data) => {
        notesDispatch({ type: "set", data });
        !data.length && setNewPedingToggle();
      });
  }, []);

  function deleteNote(id) {
    if (window.confirm("Удалить заметку?")) {
      authFetch(`/notes/${id}`, { method: "delete" })
        .then((res) => res.json())
        .then((data) => {
          notesDispatch({ type: "delete", id: id });
          toast.success("Заметка удалена");
        });
    }
  }

  const [notesShow, setNotesShow] = useState(true);

  function notesShowToggle() {
    setNotesShow(!notesShow);
    setNewPeding(false);
  }

  return (
    <Box className="mb-3">
      <Stack spacing={2} alignItems={"center"} direction={"row"}>
        {notesShow && (
          <Button onClick={setNewPedingToggle} variant="contained">
            {newPending ? "Отменить" : "Добавить"}
          </Button>
        )}

        <Chip
          label={notesShow ? "Скрыть" : "Показать"}
          onClick={notesShowToggle}
        />
      </Stack>
      <TransitionGroup>
        {notesShow && (
          <Collapse>
            <Stack
              flexWrap={"wrap"}
              direction={"row"}
              spacing={2}
              useFlexGap
              sx={{ margin: "15px 0px", maxWidth: 700 }}
            >
              {newPending && (
                <NewNote
                  onAdd={(data) => {
                    notesDispatch({ type: "add", data });
                  }}
                  sitePath={sitePath}
                />
              )}

              {notes &&
                notes.map((note) => {
                  return (
                    <Card
                      sx={{
                        width: { xs: 155, sm: 200 },
                        height: 200,
                        paddingBottom: 0,
                      }}
                      key={note.id}
                    >
                      <Stack sx={{ height: "100%" }}>
                        {note.title && (
                          <CardTitle component="pre">{note.title}</CardTitle>
                        )}
                        <CardBody
                          sx={{
                            whiteSpace: "pre-wrap",
                            wordWrap: " break-word",
                            flexGrow: 1,
                            paddingBottom: "0!important",
                          }}
                          component={"pre"}
                        >
                          <Typography>{note.text}</Typography>
                        </CardBody>
                        <CardActions
                          sx={{ justifyContent: "end", alignItems: "flex-end" }}
                        >
                          <IconButton
                            sx={{
                              width: "fit-content",
                            }}
                            onClick={() => {
                              deleteNote(note.id);
                            }}
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </CardActions>
                      </Stack>
                    </Card>
                  );
                })}
            </Stack>
          </Collapse>
        )}
      </TransitionGroup>
    </Box>
  );
};
