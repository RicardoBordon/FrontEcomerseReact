import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Slide } from '@mui/material';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { delFromCart, numItems } from '../Features/Cart/CartSlice';

function Cart(){
    let item = useSelector((state) => state.cart.item);
    const dispatch = useDispatch();
    const [checked] = React.useState(true);
    
    let number = 1;
    let total = 0;


    item.forEach(element => {
        total = total + element.price;
    });
  
    return (
    <>
      
      
    <Container sx={{ py: 1, boxShadow: 24, bgcolor:"#009688"}} maxWidth="md">
    <Typography gutterBottom variant="h6" component="div" align="center" sx={{ py: 1, m:3, boxShadow: 20, color: "white" }}>
      Carrito de Compras:
      </Typography> 
  
    <Grid container spacing={0}>


      {item.map((element) => ( 

        <Grid item key={number++} xs={12} sm={12} md={12}>
              <Slide 
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1200 } : {})}
            >

        <Card sx={{ display: 'flex', flexDirection: {md:'row',sm:'row', xs:'column', }, boxShadow: 18, h: { xs: 200 }, m:1}} > 
        <CardContent>
        <Typography gutterBottom variant="string" component="div" align="right">
            Art. N°{number}:
            </Typography>
            </CardContent>
        <CardMedia
          component="img"
          alt="Vino"
          height="120"
          image={element.image} 
          sx={{ width: 40 }}/>

          <CardContent sx={{ width: {xs:200, sm:300, md:350 } }}>
            <Typography gutterBottom variant="body2" component="div" align="left" >
             {element.name}
            </Typography>
            </CardContent>

            <CardContent align="right">
            
            <Typography gutterBottom variant="h5" component="div" align="center" sx={{width: 120, mr:{xs:0, md:5}}}>
             $ {element.price},00
            </Typography>

             
          </CardContent>
          <CardActions>
          <Button variant='contained' color="warning" sx={{width: 85}} onClick={() => dispatch(delFromCart(element.count))}>Eliminar</Button>    
          </CardActions>
          
      </Card>
      </Slide >
      </Grid>

        
      ))}

      
      </Grid >
      <CardContent>
      <Typography gutterBottom variant="h6" component="div" align="center" sx={{ py: 2, m:5, color:"black", bgcolor:"#eeeeee", boxShadow: 24 }}>
          El precio total es:<Typography variant="h5" sx={{m:1, color:"red", bgcolor:"#eeeeee", fontSize:"27px" }}>$ {total},00</Typography>
            </Typography>
            </CardContent>  
      </Container>
  
    </>
    )
  }

  export default Cart;

//   onChange={() => dispatch(acumular(element.price))}