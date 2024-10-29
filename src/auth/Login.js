import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "assets/img/brand/logo.png";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";
const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  function auth(data) {
    fetch(`${process.env.REACT_APP_API_HOST_COMMON}/auth/login`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.token) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          if (data.rememberMe) {
            localStorage.setItem("token", resJson.token);
            localStorage.setItem("role", resJson.role);
          } else {
            sessionStorage.setItem("token", resJson.token);
            sessionStorage.setItem("role", resJson.role);
          }

          return navigate("/index");
        } else {
          toast.error(resJson.message);
        }
      });
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Paper sx={{ maxWidth: 350, margin: "auto" }} elevation={3}>
      <Box sx={{ p: 3, width: 350 }}>
        <Stack spacing={2}>
          <img className="navbar-brand-img" src={logo} alt="logo" />
          <Controller
            name="login"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <TextField
                onChange={onChange}
                label="Логин"
                error={!!errors.login}
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <TextField
                onChange={onChange}
                label="Пароль"
                error={!!errors.password}
                required
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
              />
            )}
          />
          <Controller
            name="rememberMe"
            control={control}
            render={({ field: { onChange } }) => (
              <FormControlLabel
                onChange={onChange}
                control={<Checkbox defaultChecked />}
                label="Запомнить меня"
              />
            )}
          />

          <div className="text-center">
            <Button
              onClick={handleSubmit((data) => {
                auth(data);
              })}
              className="my-4"
              variant="contained"
            >
              Войти
            </Button>
          </div>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Login;
