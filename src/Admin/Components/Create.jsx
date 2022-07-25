import React from "react";
import Swal from 'sweetalert2';
import { useState } from "react";
import { Input, Grid, InputLabel, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../../Contexts/authContext";

const Create = () => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState([]);
  const { globalAdminToken} = useAuthContext()

  //URL a API
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/createProduct`;

  //cambia estadp al recibir una imagen
  const selectHandler = (e) => {
    setFile(e.target.files[0]);
  };

  //cambios del formulario

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.item]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.cstock]: e.target.value,
      
    });
  };

  //enviar imagenes al endpoint
  const sendHandler = () => {
    if (!file) {
      Swal.fire({
        text: 'No hay archivo!',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }
    const formdata = new FormData();
  
    formdata.append("image", file);
    formdata.append("item", form.item);
    formdata.append("name", form.name);
    formdata.append("price", form.price);
    formdata.append("description", form.description);
    formdata.append("cstock", form.cstock);
   
    fetch(base + endpoint, {
      method: "POST",
      headers: {
      Authorization: "Bearer " + globalAdminToken.tokenAdmin},
      body: formdata
    })
    .then(function (response) {
      if(response.status === 400){
        Swal.fire({
          text: 'Error al registrar producto...',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
      else if(response.status === 201){
        Swal.fire({
          text: "Creado correctamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    })
    .catch(function (error) {
      alert("Error en servidor")
    });
  }

  const theme = createTheme();

  return (
    <>
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
              Nuevo Producto:
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
                <form onSubmit={sendHandler}>
                  <InputLabel htmlFor="image">Imagen: </InputLabel>
                  <Input onChange={selectHandler} type="file" name="file" />

                  <InputLabel sx={{ mt: 2 }} htmlFor="item">
                    Item n:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="item"
                    name="item"
                    type="number"
                    value={form.item}
                    onChange={handleChange}
                  ></Input>
                  <InputLabel sx={{ mt: 2 }} htmlFor="name">
                    Nombre:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="name"
                    name="name"
                    type="string"
                    value={form.name}
                    onChange={handleChange}
                  ></Input>
                  <InputLabel sx={{ mt: 2 }} htmlFor="price">
                    Precio (int):{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                  ></Input>
                  <InputLabel sx={{ mt: 2 }} htmlFor="description">
                    descripcion:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="description"
                    name="description"
                    type="string"
                    value={form.description}
                    onChange={handleChange}
                  ></Input>
                  <InputLabel sx={{ mt: 2 }} htmlFor="cstock">
                    c.stock:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="cstock"
                    name="cstock"
                    type="number"
                    value={form.cstock}
                    onChange={handleChange}
                  ></Input>
                                  <Button
                  sx={{ mt: 8, width: "88%" }}
                  variant="contained"
                  color="primary"
                  onClick={sendHandler}
                >
                  Crear
                </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Create;
