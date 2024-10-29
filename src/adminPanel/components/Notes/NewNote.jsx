import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import { authFetch } from "adminPanel/views/Index/functions/authFetch";
import { toast } from "react-toastify";

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
        width: { xs: 155, sm: 200 },

        paddingBottom: 0,
      }}
    >
      <CardContent>
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
        <Stack spacing={1}>
          <TextField
            sx={{
              ".MuiInputBase-root": { fontSize: 13, paddingTop: 1 },
            }}
            multiline
            variant="filled"
            placeholder="Текст"
            onChange={(e) => {
              setNewNote({
                ...newNote,
                text: e.target.value,
              });
            }}
          />
          <Button onClick={add} variant="contained">
            Добавить
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
