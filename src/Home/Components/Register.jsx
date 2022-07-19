import React from "react";
import { Form, useFormik } from "formik";
import axios from "axios";

import {
  Input,
  Grid,
  InputLabel,
  Button,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";


Form
const SignupForm = () => {
  //URL API
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/register`;


  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      lastName: "",
      dni: "",
      phone: "",
      password: "",
    },
    onSubmit: (values) => {

      axios({
        method: "post",
        url: base+endpoint,
        data: {
          email: values.email,
          name: values.name,
          lastName: values.lastName,
          dni: values.dni,
          phone: values.phone,
          password: values.password,
        },
      })
      .then(function (response) {
        alert("Registrado correctamente, verifique correo no deseado")
      })
      .catch(function (error) {
        alert("Error al registrar")
      });

      }
  });
  

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={4}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Nuevo Usuario:
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          elevation={24}
          variant="elevation"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
              <form onSubmit={formik.handleSubmit}>
                <InputLabel sx={{ mt: 2 }} htmlFor="email">
                  Email:{" "}
                </InputLabel>
                <Input
                  sx={{ width: "88%" }}
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                ></Input>
                <InputLabel sx={{ mt: 2 }} htmlFor="name">
                  Nombre:{" "}
                </InputLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                ></Input>
                <InputLabel sx={{ mt: 2 }} htmlFor="lastName">
                  Apellido:{" "}
                </InputLabel>
                <Input
                  sx={{ width: "88%" }}
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                ></Input>
                <InputLabel sx={{ mt: 2 }} htmlFor="dni">
                  Dni:{" "}
                </InputLabel>
                <Input
                  sx={{ width: "88%" }}
                  id="dni"
                  name="dni"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.dni}
                ></Input>
                <InputLabel sx={{ mt: 2 }} htmlFor="phone">
                  Teléfono:{" "}
                </InputLabel>
                <Input
                  sx={{ width: "88%" }}
                  id="phone"
                  name="phone"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                ></Input>
                <InputLabel sx={{ mt: 2 }} htmlFor="password">
                  Password:{" "}
                </InputLabel>
                <Input
                  sx={{ width: "88%" }}
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                ></Input>
                <Button
                  sx={{ mt: 8, width: "88%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  title="Submit"
                  // onClick={formik.resetForm}
                >
                  Enviar
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
