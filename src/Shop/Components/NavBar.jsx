import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";
import { useAuthContext } from "../../Contexts/authContext";
import { Link, Navigate, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SvgIcon } from "@mui/material";
import { useState } from "react";
import { delFromCart, numItems } from "../Features/Cart/CartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./styles.css";
import {LOGIN, PRIVATE, HOME} from '../../Config/Routes/paths';

function SearchAppBar() {
  const { Logout } = useAuthContext();
  const dispatch = useDispatch();
    //URL API
    const base = import.meta.env.VITE_BASE_URL;
    const endpoint = `/logout`;

  const outSession = (event) => {
    event.preventDefault();
    axios({
      method: "get",
      url: base+endpoint,
      withCredentials: true,
    })
    .then(function (response) {
      Logout();
    })
    .catch(function (error) {
      alert("Error")
    });

    return <Navigate to={LOGIN}/>
    
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="navBar">
      <AppBar position="static" sx={{ bgcolor: "#009688"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            WinesDev
          </Typography>

          <Link
            to={"/shop/cart"}
            className="NavLinkButton"
            onClick={() => dispatch(numItems())}    
          >
            <Button variant="outlined" color="inherit" size="small">
              <SvgIcon variant="content">
                <ShoppingCartIcon />
              </SvgIcon>...
              Carrito
            </Button>
          </Link>

          <Button sx={{ml:1}} variant="outlined" color="inherit" size="small"  onClick={outSession}>Salir</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SearchAppBar;
