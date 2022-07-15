import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SearchIcon from "@mui/icons-material/Search";
import { BottomNavigation, ButtonBase, InputBase, Link } from "@mui/material";
import { useAuthContext } from "../../Contexts/authContext";
import { Fragment } from "react";
import { set } from "react-hook-form";
import { useState } from "react";
import { Button } from "@mui/material";
import { Navigate, NavLink } from "react-router-dom";


function HomeNavBar() {
  const [data, setData] = useState([]);
  const { Logout } = useAuthContext();
  const { isAuthenticated } = useAuthContext();

  const outSession = (event) => {
    event.preventDefault();
    console.log("asdasdasdasd");
    Logout();
  };

  const handleOnChange = (event) => {
    setData(event.target.value);
    console.log(data);
  };

  const toLogin = () => {
    return <Navigate to={"/login"} replace={true}/>;
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
            WinesDev
          </Typography>
          <NavLink to={"/login"} className="NavLinkButton">
          <Button variant="content" color="action">
            Login
          </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HomeNavBar;
