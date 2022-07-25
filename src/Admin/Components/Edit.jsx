import React from "react";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
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
import { useAuthContext } from "../../Contexts/authContext";

const Edit = () => {
  const itemID = window.location.pathname;
  const ID = itemID.split("/").pop();

  //URL a API
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint1 = `/admin/singleProduct/${ID}`;
  const endpoint2 = `/updateProduct/${ID}`;

  const [datas, setDatas] = useState([]);
  const { globalAdminToken} = useAuthContext()

  useEffect(() => {
    fetch(base+endpoint1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + globalAdminToken.tokenAdmin,
      },
    })
      .then((res) => res.json())
      .then((json) => setDatas(json[0]));
  }, []);

  const { item, name, image, price, description, cstock } = datas;

  const [form, setForm] = useState({});
  const [file, setFile] = useState([]);

  //cambia estado al recibir una imagen

  function selectHandler(e) {
    setFile(e.target.files[0]);
  }

  //cambios del formulario

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.item]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.description]: e.target.value,
      [e.target.cstock]: e.target.value,
    })
    setDatas("");
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

    fetch(base + endpoint2, {
      headers: {
        Authorization: "Bearer " + globalAdminToken.tokenAdmin,
      },
      method: "POST",
      body: formdata,
    })
  .then(function (response) {
    if(response.status === 400){
      alert("Error al registrar")
    }
    else if(response.status === 201){
      alert("Actualizado correctamente")
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
            <img src={file} style={{ width: "300px" }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
                <form onSubmit={sendHandler}>
                  <InputLabel sx={{ mt: 2 }} htmlFor="image">
                    Imagen:{" "}
                  </InputLabel>

                  <Input onChange={selectHandler} type="file" name="file" />

                  <InputLabel sx={{ mt: 2 }} htmlFor="item">
                    Item n:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="item"
                    name="item"
                    type="number"
                    value={form.item || item}
                    onChange={handleChange}
                    disabled
                  ></Input>
                  <InputLabel sx={{ mt: 2 }} htmlFor="name">
                    Nombre:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="name"
                    name="name"
                    type="string"
                    value={form.name || name}
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
                    value={form.price || price}
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
                    value={form.description || description}
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
                    value={form.cstock || cstock}
                    onChange={handleChange}
                  ></Input>
                <Button
                  sx={{ mt: 8, width: "88%" }}
                  variant="contained"
                  color="primary"
                  onClick={sendHandler}
                >
                  Validar Cambios
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
export default Edit;
