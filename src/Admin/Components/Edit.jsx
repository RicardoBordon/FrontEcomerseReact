import React from "react";
import Swal from "sweetalert2";
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
  TextareaAutosize,
  CardMedia,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../../Contexts/authContext";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { ADMIN } from "../../Config/Routes/paths";
import { blue } from "@mui/material/colors";

const Edit = () => {
  const ID = useParams().id;

  //URL a API
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint1 = `/admin/singleProduct/${ID}`;
  const endpoint2 = `/updateProduct/${ID}`;

  const [datas, setDatas] = useState([]);
  const { globalAdminToken } = useAuthContext();

  useEffect(() => {
    fetch(base + endpoint1, {
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
    });
    setDatas("");
  };

  //enviar imagenes al endpoint
  const sendHandler = () => {
    if (!file) {
      Swal.fire({
        text: "No hay archivo!",
        icon: "warning",
        confirmButtonText: "Ok",
      });
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

        if (response.ok === true) {
          Swal.fire({
            text: "Actualizado correctamente",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else if (response.ok === false) {
          Swal.fire({
            text: "Error al registrar",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch(function (error) {
        alert("Error en servidor");
      });
  };

  const theme = createTheme();

  
  function ImgPrev({ file }) {
    if(file.name === undefined){
      return (
        <CardMedia
        onChange={ImgPrev}
        component="img"
        alt="Vino"
        height="100%"
        image= {image}
        sx={{width: "250px", m:2}}
      />
      )
    } 
    else {
      return (
        <CardMedia
        onChange={ImgPrev}
        component="img"
        alt="Vino"
        height="100%"
        image= {URL.createObjectURL(file)}
        sx={{width: "250px", m:2}}
      />
      )
      
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          elevation={5}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
            bgcolor: "black",
          }}
        >
          <Toolbar>
            <Typography variant="h7" color="inherit" noWrap>
              Producto:
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            elevation={24}
            variant="elevation"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            

            <Grid container spacing={5}>
              <Grid item xs={12} md={12} lg={12} sx={{ ml: 5, mt: 2, mb: 5 }}>
                <form onSubmit={sendHandler}>
                  <ImgPrev file={file}></ImgPrev>


                  <InputLabel sx={{ color: "blueviolet" }} htmlFor="image">
                    Imagen:{" "}
                  </InputLabel>

                  <Input
                    sx={{ width: "88%" }}
                    onChange={selectHandler}
                    type="file"
                    name="file"
                    required
                  />

                  <InputLabel
                    sx={{ mt: 4, color: "blueviolet" }}
                    htmlFor="item"
                  >
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
                  <InputLabel
                    sx={{ mt: 4, color: "blueviolet" }}
                    htmlFor="name"
                  >
                    Nombre:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="name"
                    name="name"
                    type="string"
                    value={form.name || name}
                    onChange={handleChange}
                    required
                  ></Input>
                  <InputLabel
                    sx={{ mt: 4, color: "blueviolet" }}
                    htmlFor="price"
                  >
                    Precio (int):{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="price"
                    name="price"
                    type="number"
                    value={form.price || price}
                    onChange={handleChange}
                    required
                  ></Input>
                  <InputLabel
                    sx={{ mt: 4, color: "blueviolet" }}
                    htmlFor="description"
                  >
                    Descripcion:{" "}
                  </InputLabel>
                  <TextareaAutosize
                    id="description"
                    name="description"
                    type="string"
                    value={form.description || description}
                    onChange={handleChange}
                    required
                    style={{ width: "88%" }}
                  ></TextareaAutosize>
                  <InputLabel
                    sx={{ mt: 4, color: "blueviolet" }}
                    htmlFor="cstock"
                  >
                    c.stock:{" "}
                  </InputLabel>
                  <Input
                    sx={{ width: "88%" }}
                    id="cstock"
                    name="cstock"
                    type="number"
                    value={form.cstock || cstock}
                    onChange={handleChange}
                    required
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
