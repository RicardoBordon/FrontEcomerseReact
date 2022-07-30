import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grow from "@mui/material/Grow";
import "../../Shop/Components/styles.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100ch",
      "&:focus": {
        width: "100ch",
      },
    },
  },
}));

function ShopAdmin() {
  //URL API
  const BASE = import.meta.env.VITE_BASE_URL;
  const endpoint = "/allProducts";

  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [checked] = React.useState(true);

  useEffect(() => {
    fetch(BASE + endpoint)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setDataFilter(json);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (busqueda) => {
    let res = data.filter((elemento) => {
      if (
        elemento.name.toString().toLowerCase().includes(busqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setDataFilter(res);
  };

  function FormatNumber({ number }) {
    return (
      <span style={{ color: "red" }}>
        {new Intl.NumberFormat("ES-AR", {
          style: "currency",
          currency: "ARS"
        }).format(number)}
      </span>
    );
  }

  return (
    <>
      <Container sx={{ py: 2, boxShadow: 4 }} maxWidth="md">
        <Container sx={{ p:5  }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
              }}
              onChange={handleChange}
              value={search}
            />
          </Search>
        </Container>

        <Grid container spacing={4}>
          {dataFilter.map((element) => (
            <Grid item key={element._id} xs={12} sm={8} md={4}>
              <Grow
                in={checked}
                style={{ transformOrigin: "0 0 0" }}
                {...(checked ? { timeout: 1200 } : {})}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 24,
                    padding: 1
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Vino"
                    height="280"
                    image={element.image}
                  />
                  <CardContent
                    sx={{ height: "38px", bgcolor: "gray", padding: "5px" }}
                  >
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      mt={0}
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {element.name}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align="center"  sx={{ color:"#dd2c00", height: "15px"}}>
                    <FormatNumber number={element.price}/>
                    </Typography>
                  </CardContent>
 
                    <NavLink
                      to={`/Admin/Edit/${element.item}`}
                      className="NavLinkButton"
                    >
                      <Button variant="contained" color="success" sx={{ width: "100%"}}>
                        Editar
                      </Button>
                    </NavLink>

                    <NavLink
                      to={`/Admin/Delete/${element.item}`}
                      className="NavLinkButton"
                    >
                      <Button variant="contained" color="error" sx={{ width: "100%"}}>
                        Borrar
                      </Button>
                    </NavLink>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default ShopAdmin;
