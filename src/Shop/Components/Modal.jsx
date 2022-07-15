import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SvgIcon } from '@mui/material';
import { shoppingReducer } from '../Reducers/ShopReducers';
import { shoppingInicialState } from '../Reducers/ShopReducers';
import { useReducer } from 'react';
import { useSelector } from 'react-redux/es/exports';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import  { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function TransitionsModal() {

  const [items, setItems] = useState([])
  const item = useSelector((state) => state.cart.item)

  useEffect(() => {
      setItems(item);
  }, [])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    
    <div>
      <Button onClick={handleOpen}><SvgIcon ><ShoppingCartIcon color="action"/></SvgIcon></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Carrito de compras:
            </Typography>

            <Container sx={{ py: 2 }} maxWidth="md">
  
  <Grid container spacing={0}>
  
  
    {items.map((element) => ( 
      
      <Grid item key={element.item} xs={12} sm={12} md={12}>
      <Card sx={{ height: '80%', display: 'flex', flexDirection: 'row'}}>
      <CardMedia
        component="img"
        alt="Vino"
        height="80"

        image={element.image} />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
           {element.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
          $ {element.price},00
          </Typography>         
        </CardContent><CardActions>
        </CardActions>
    </Card>
    </Grid> 
    ))}
    </Grid>
    </Container>
    <Typography gutterBottom variant="h6" component="div">
          </Typography>
            

          </Box>
        </Fade>
      </Modal>
    </div>
  );
};