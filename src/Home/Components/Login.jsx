import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../../Contexts/authContext";
import { Navigate, NavLink } from "react-router-dom";
import { ADMIN, PRIVATE } from "../../Config/Routes/paths";
import "../../Shop/Components/styles.css";
import axios from "axios";
import Swal from 'sweetalert2';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/login`;

  const { login, Admin } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await axios({
      method: "post",
      url: base + endpoint,
      data: data,
      withCredentials: true,
    })
      .then(async function (response) {
        if (response.data.token !== undefined)await login(response.data);
        else if (response.data.tokenAdmin !== undefined)await Admin(response.data);
      }, [])
      .catch(function (error) {
        Swal.fire({
          text: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
  };
  if (sessionStorage.getItem("user")) {
    return <Navigate to={PRIVATE} />;
  } else if (sessionStorage.getItem("admin")) {
    return <Navigate to={ADMIN} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://www.cronista.com/files/image/346/346068/610b207323724.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink to="/error" variant="body2">
                    ¿Olvido la contraseña?
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to="/register" variant="body2">
                    {"¿No tiene cuenta? cree una aquí"}
                  </NavLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 9 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
