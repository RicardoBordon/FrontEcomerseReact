import React from "react";
import HomeNavBar from "../Components/HomeNavBar";
import Shop from "../../Shop/Components/Shop";
import { bgcolor } from "@mui/system";


const HomeShopScreen = () => {
  return (
    <>
    <HomeNavBar />
    <Shop /> 
    </>
  );
};

export default HomeShopScreen;