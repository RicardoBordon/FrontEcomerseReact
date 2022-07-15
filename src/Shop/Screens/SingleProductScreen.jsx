import React from "react";
import SearchAppBar from "../Components/NavBar";
import SingleProduct from "../Components/SingleProduct";
import { StyledEngineProvider } from '@mui/material/styles';


const SingleProductScreen = () => {
  return (
    <>
    <StyledEngineProvider injectFirst>
    <SearchAppBar/>
    <SingleProduct/>
    </StyledEngineProvider> 
    </>
  );
};

export default SingleProductScreen;