import React from "react";
import { Formik } from "formik";

import { useState } from "react";
import { Input, Grid, InputLabel, Button} from "@mui/material";

const Createv2 = () => {
  const [form, setForm] = useState({});
  const [file, setFile] = useState([]);

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
      alert("no hay archivo pete");
      return;
    }
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("item", form.item);
    formdata.append("name", form.name);
    formdata.append("price", form.price);
    formdata.append("description", form.description);
    formdata.append("cstock", form.cstock);

    fetch("http://localhost:5000/api/v1/createProduct", {
      method: "POST",
      body: formdata,
    });
  };

  return (
    <>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
      <form onSubmit={sendHandler}>
        <div>
        <InputLabel htmlFor="image">Imagen: </InputLabel>
        <Input onChange={selectHandler} type="file" name="file" />

        <InputLabel htmlFor="item">Item n: </InputLabel>
        <Input
          id="item"
          name="item"
          type="number"
          value={form.item}
          onChange={handleChange}
        ></Input>
        <InputLabel htmlFor="name">Nombre: </InputLabel>
        <Input
          id="name"
          name="name"
          type="string"
          value={form.name}
          onChange={handleChange}
        ></Input>
        <InputLabel htmlFor="price">Price: </InputLabel>
        <Input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        ></Input>
        <InputLabel htmlFor="description">description: </InputLabel>
        <Input
          id="description"
          name="description"
          type="string"
          value={form.description}
          onChange={handleChange}
        ></Input>
        <InputLabel htmlFor="cstock">cstock: </InputLabel>
        <Input
          id="cstock"
          name="cstock"
          type="number"
          value={form.cstock}
          onChange={handleChange}
        ></Input>
        <Button variant="contained" color="primary" type="submit">Enviar</Button>
        </div>
      </form>
      </Grid>
      </Grid>
    </>
  );
};

export default Createv2;
