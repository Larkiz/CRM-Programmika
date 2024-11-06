import {
  Container,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { authFetch } from "@/userPanel/functions/authFetch";

export const UserIndex = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    authFetch(`/account`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <Container sx={{ paddingBottom: 1 }} maxWidth={false}>
      <Typography sx={{ marginBottom: 4 }} variant="h4">
        Личный кабинет
      </Typography>
      <Stack spacing={3} alignItems={"center"} direction={"row"}>
        <AccountCircleIcon sx={{ fontSize: 120, color: "rgb(18, 24, 131)" }} />
        <Stack>
          <Typography variant="h5">{profile?.first_name}</Typography>
          <Typography variant="h5">{profile?.last_name}</Typography>
        </Stack>
      </Stack>
      <Stack
        alignItems={{ xs: "center", sm: "stretch" }}
        sx={{ marginTop: 3 }}
        spacing={2}
        flexWrap={"wrap"}
        useFlexGap
        direction={{ xs: "column", sm: "row" }}
      >
        <Paper sx={{ width: 300, minHeight: 185 }} elevation={5}>
          <Typography
            sx={{ marginTop: 3, p: 2, paddingBottom: 0 }}
            variant="h6"
          >
            Курсы
          </Typography>
          <List sx={{ height: 140, overflowY: "scroll" }}>
            {profile?.courses.map((course, key) => {
              return (
                <ListItem key={key}>
                  <Stack spacing={1} alignItems={"center"} direction={"row"}>
                    <NavigateNextIcon />
                    <Typography variant="body1">
                      {course.name.length < 15 ? course.name : course.shortName}
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      {course.price} <i className="fa-solid fa-ruble-sign"></i>
                    </Typography>
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <Paper sx={{ width: 300, minHeight: 185 }} elevation={5}>
          <Typography
            sx={{ marginTop: 3, p: 2, paddingBottom: 0 }}
            variant="h6"
          >
            Контакты
          </Typography>
          <List>
            <ListItem sx={{ gap: 1 }} key={"ph_number"}>
              <Typography>Студент:</Typography>
              <Typography variant="subtitle2">
                {profile?.phone_number ? profile.phone_number : "Неизвестно"}
              </Typography>
            </ListItem>
            <ListItem sx={{ gap: 1 }} key={"parent_number"}>
              <Typography>Родители:</Typography>
              <Typography variant="subtitle2">
                {profile?.parent_phone ? profile.parent_phone : "Неизвестно"}
              </Typography>
            </ListItem>
          </List>
        </Paper>
        <Paper sx={{ width: 300, minHeight: 185 }} elevation={5}>
          <Typography
            sx={{ marginTop: 3, p: 2, paddingBottom: 0 }}
            variant="h6"
          >
            Данные
          </Typography>
          <List>
            <ListItem sx={{ gap: 1 }} key={"ph_number"}>
              <Typography>Город:</Typography>
              <Typography variant="subtitle2">
                {profile?.city ? profile.city : "Неизвестно"}
              </Typography>
            </ListItem>
            <ListItem sx={{ gap: 1 }} key={"parent_number"}>
              <Typography>Дата рождения:</Typography>
              <Typography variant="subtitle2">
                {profile?.birthday ? profile.birthday : "Неизвестно"}
              </Typography>
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Container>
  );
};
