import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { States } from "../Context/Context";
import CustomDialog from "./Dialog";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",

  lineHeight: "60px",
  marginBottom: 10,
}));

const Image = styled(Box)(() => ({
  height: 100,
  width: 100,
}));

const Cart = () => {
  const { cart, setcart } = States();
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({})
  // Handles inc && dec of product quantity
  const handleQty = (value, type) => {
    const cartItemIndex = cart.map((item) => item.id).indexOf(value);
    if (type === "dec" && cart[cartItemIndex].qty === 1) {
      removeCartItem(cart[cartItemIndex].id);
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === value) {
          type === "dec" ? (item.qty -= 1) : (item.qty += 1);
        }
        return item;
      });
      setcart(updatedCart);
    }
    calculateTotal();
  };
  //removes cart item
  const removeCartItem = (value) => {
    setcart(cart.filter((item) => item.id !== value));
    calculateTotal();
  };
  //calculate total cart price
  function calculateTotal() {
    let value = 0;
    cart.forEach((item) => {
      value += item.price * item.qty;
    });
    setTotal(value);
  }
  const handleClose = (value) => {
    if (value) {
      removeCartItem(value)
    }
    setOpen(false);
  };
  const openDialog = (item) => {
    setOpen(true);
    setData({
      title: item.name,
      id: item.id,
      message: `Sure want to delete Cart Item ?`
    })
    // return <CustomDialog open={open} handleClose={handleClose} />
  }
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      {
        cart.length > 0 ?
        (<Stack direction={{sm: 'row', xs: 'column'}} spacing={2}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            placeContent: "center space-between",
          }}
        >
          <Grid item>
            {cart.map((item) => (
              <Item key={item.id} elevation={1}>
                <Stack direction="row" spacing={3} sx={{ p: 1 }}>
                  <Image sx={{ p: 1 }}>
                    <img src={item.imageURL} style={{ width: "100%" }} />
                  </Image>
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ textAlign: "start" }}
                  >
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {item.price * item.qty}
                    </Typography>
                  </Stack>
                  <Stack direction='column'>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <IconButton
                      disabled={item.qty < 1}
                      onClick={() => handleQty(item.id, "dec")}
                    >
                      <RemoveCircle />
                    </IconButton>
                    <Typography varient="h6" component="div">
                      {item.qty}
                    </Typography>
                    <IconButton
                      disabled={item.qty >= item.quantity}
                      onClick={() => handleQty(item.id, "inc")}
                    >
                      <AddCircle />
                    </IconButton>
                  </Box>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Button
                      variant="contained"
                      onClick={() => openDialog(item)}
                    >
                      Delete
                    </Button>
                  </Box>
                  </Stack>
                </Stack>
              </Item>
            ))}
          </Grid>
        </Grid>
        <Paper sx={{width: '100%', p: 1, height: 100, display: 'flex', flexDirection: 'column',placeContent:"space-between"}} >
          <Typography variant="h5" component="div">Shopping Cart</Typography>
          <Typography variant="p" component="div">Total:  ${total}</Typography>
        </Paper>
        </Stack>)
        :
        (<Stack direction="column" spacing={2} justifyContent="center" alignItems="center" >
          <Typography variant="h5" component="div">Shopping Cart is empty</Typography>
          <Link to='/'><Button variant="contained" sx={{textDecoration: 'none'}}>Back to Home</Button></Link>
        </Stack>)
      }
      <CustomDialog open={open} handleClose={handleClose} data={data} />  
    </Box>
  );
};

export default Cart;
