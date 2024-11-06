import { useState } from "react";

import {
  Card,
  CardActions,
  IconButton,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import { authFetch } from "@/adminPanel/functions/authFetch";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CardTitle } from "@/commonComponents/Card/Card";
import { CardBody } from "@/commonComponents/Card/Card";
export const NewNote = ({ sitePath, onAdd }) => {
  const [newNote, setNewNote] = useState({
    title: null,
    text: null,
    sitePath: sitePath,
  });

  function add() {
    if (newNote.text) {
      authFetch(`/notes`, {
        method: "post",
        body: JSON.stringify(newNote),
      })
        .then((res) => res.json())
        .then((data) => {
          onAdd(data);
          toast.success("Заметка добавлена");
        });
    } else {
      toast.error("Поле текст обязательно");
    }
  }

  return (
    <Card
      sx={{
        width: { xsm: 170, xs: 155, sm: 200 },
        height: 220,
        paddingBottom: 0,
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <CardTitle noBorder sx={{ marginTop: "8px" }} component="pre">
          <Input
            sx={{
              marginBottom: 1,
              minHeight: 65,
            }}
            onChange={(e) => {
              setNewNote({
                ...newNote,
                title: e.target.value,
              });
            }}
            multiline
            placeholder="Заголовок"
          />
        </CardTitle>
        <CardBody
          sx={{
            flexGrow: 1,
            paddingBottom: "0!important",
          }}
        >
          <TextField
            sx={{
              ".MuiInputBase-root": { fontSize: 13, paddingTop: 1 },
            }}
            multiline
            variant="filled"
            rows={3}
            placeholder="Текст"
            onChange={(e) => {
              setNewNote({
                ...newNote,
                text: e.target.value,
              });
            }}
          />
        </CardBody>

        <CardActions
          sx={{
            justifyContent: "end",
            alignItems: "flex-end",
            height: 35,
          }}
        >
          <IconButton
            sx={{
              width: "fit-content",
            }}
            onClick={add}
          >
            <AddCircleIcon sx={{ fontSize: 25 }} color="success" />
          </IconButton>
        </CardActions>
      </Stack>
    </Card>
  );
};
