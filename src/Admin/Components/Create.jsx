import React from "react";
import Swal from 'sweetalert2';
import { useState } from "react";
import { Input, Grid, InputLabel, Button, TextareaAutosize, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../../Contexts/authContext";
import { Navigate, Outlet } from 'react-router-dom';
import { ADMIN } from "../../Config/Routes/paths";

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
     if(response.ok){
        Swal.fire({
          text: "Creado correctamente",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }  
      else if(!response.ok){
        Swal.fire({
          text: 'Error al registrar producto...',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
        
      }
    })
    .catch(function (error) {
      Swal.fire({
        text: error,
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
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
            bgcolor:"black",
          }}
        >
          <Toolbar>
            <Typography variant="h7" color="inherit" noWrap>
              Nuevo Producto:
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            elevation={24}
            variant="elevation"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
                <form onSubmit={sendHandler}>
                  <InputLabel sx={{ color:"blueviolet"}} htmlFor="image">Imagen: </InputLabel>
                  <Input onChange={selectHandler} type="file" name="file" />

                  <InputLabel sx={{ mt: 4, color:"blueviolet" }} htmlFor="item">
                    Item n:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="item"
                    name="item"
                    type="number"
                    value={form.item}
                    onChange={handleChange}
                    required
                  ></Input>
                  <InputLabel sx={{ mt: 4, color:"blueviolet" }} htmlFor="name">
                    Nombre:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="name"
                    name="name"
                    type="string"
                    value={form.name}
                    onChange={handleChange}
                    required
                  ></Input>
                  <InputLabel sx={{ mt: 4, color:"blueviolet" }} htmlFor="price">
                    Precio (int):{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    required
                  ></Input>
                  <InputLabel sx={{ mt: 4, color:"blueviolet" }} htmlFor="description">
                    Dasescripcion:{" "}
                  </InputLabel>
                  <TextareaAutosize
                    sx={{ width: "88%" }}
                    id="description"
                    name="description"
                    type="string"
                    value={form.description}
                    onChange={handleChange}
                    required
                    style={{ width: "88%" }}
                    minRows={4}
                  ></TextareaAutosize>
                  <InputLabel sx={{ mt: 4, color:"blueviolet" }} htmlFor="cstock">
                    c.stock:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="cstock"
                    name="cstock"
                    type="number"
                    value={form.cstock}
                    onChange={handleChange}
                    required
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
