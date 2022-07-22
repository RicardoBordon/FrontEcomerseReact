import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { useAuthContext } from "../../Contexts/authContext";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
    .then(function (response) {
      Logout();
    })
    .catch(function (error) {
      alert("Error")
    });
    
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            WinesDev (Admin)
          </Typography>

          <NavLink to={`/Admin/Create`} className="NavLinkButton">
            <Button variant="contained" color="success" sx={{ mr: 5 }}>
              Agregar Producto
            </Button>
          </NavLink>

          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={outSession}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBaradmin;
