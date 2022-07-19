import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function HomeNavBar() {

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
