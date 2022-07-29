import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../../Contexts/authContext";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";

function NavBaradmin() {
  const { Logout } = useAuthContext();
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
    .then(function () {
      Logout();
    })
    .catch(function () {
      alert("Error")
    });
    
  };
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{ bgcolor: "black"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            WinesDev (Admin)
          </Typography>

          <NavLink to={`/Admin/Create`} className="NavLinkButton">
            <Button variant="contained" color="success" sx={{ m:-0.5 }} size="small">
              Agregar Producto
            </Button>
          </NavLink>

          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={outSession}
            sx={{ ml: 3 }}
          >
            Salir
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBaradmin;
