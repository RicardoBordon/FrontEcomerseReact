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
      
      
    <Container sx={{ py: 1 }} maxWidth="md">
    <Typography gutterBottom variant="h5" component="div" align="center" sx={{ py: 3 }}>
      Carrito de Compras:
      </Typography> 
  
    <Grid container spacing={3}>


      {item.map((element) => ( 

        <Grid item key={number++} xs={12} sm={12} md={12}>
              <Slide 
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1200 } : {})}
            >

        <Card sx={{ height: '90', display: 'flex', flexDirection: {md:'row',sm:'row', xs:'column', }, boxShadow:3, h: { xs: 200 } }} > 
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

      
      </Grid>
      <Typography gutterBottom variant="h5" component="div" align="center" sx={{ py: 8 }}>
          El precio total es:  $ {total},00
            </Typography>
      </Container>
  
    </>
    )
  }

  export default Cart;

//   onChange={() => dispatch(acumular(element.price))}