import React from 'react';
import axios from 'axios';

import  { useEffect, useState } from "react";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Fade } from '@mui/material';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../Features/Cart/CartSlice';

 function SingleProduct(){
  const cookies = new Cookies();

  const itemID = window.location.pathname;
  const ID =  itemID.split("/").pop();

  const BASE = "http://localhost:5000/api/v1";
  const endpoint= `/singleProduct/${ID}`;
  const [datas, setDatas] = useState({});
  const dispatch = useDispatch();

  const [checked] = React.useState(true);

  useEffect(() => {
     fetch(BASE+endpoint, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies.get("token")
    }
  })
    .then(res => res.json())
    .then(json => setDatas(json[0]))
    }, [])
      
   return (
   <>
   <Fade 
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 900 } : {})}
            > 
   <Grid container spacing={1} justifyContent="center" sx={{p: {md:8, xs:1, sm:2}}}>
  <Grid item xs={4}>
 
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3}}> 
  <CardMedia
         component="img"
         alt="Vino"
         height="500"
         image={datas.image} />
         </Card> 
  </Grid>
  
  <Grid item xs={8}>

  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3}}>
  <Typography gutterBottom  component="div" sx={{m:{md:8, xs:1, sm:2}}}>
  <Grid container spacing={8}  direction="column" justifyContent="center" alignItems="flex-start">
  <Grid item xs={12}><Typography variant="h6">{datas.name}</Typography></Grid>
  <Grid item xs={12}><Typography variant="h6">Precio: $ {datas.price},00</Typography></Grid>
  <Grid item xs={12}><Typography variant="h6">Stock: {datas.cstock}</Typography></Grid> 
  <Grid item xs={12}><Button onClick={() => dispatch(addtoCart(datas))} variant="contained" color='success'>Agregar al carrito</Button></Grid>
  
  </Grid>
  </Typography>
    </Card>
  
    
  </Grid>
  <Grid item xs={12}>
    <Card sx={{boxShadow: 3}}>
  <Typography gutterBottom variant="body1" component="div" align="left" sx={{m:4}}>
            {datas.description}
           </Typography>
           </Card>
           
  </Grid>
</Grid>
</Fade >
   </>
   )
}

export default SingleProduct;