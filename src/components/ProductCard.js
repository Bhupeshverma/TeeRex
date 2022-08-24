import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  useTheme,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { States } from "../Context/Context";

const ProductCard = ({ product }) => {
  const { cart, setcart } = States();
  const [quantity, setQuantity] = useState(product.quantity);
  const handleAddToCart = () => {
    const item = cart.find((item) => item.id === product.id);
    console.log(cart, item);
    if (item) {
      item.qty += 1;
    } else {
      setcart([...cart, { ...product, qty: 1 }]);
    }
    setQuantity((qty) => qty - 1);
  };
  return (
    <Paper className="product" elevation={0}>
      <Card sx={{ maxWidth: 345, minWidth: 250 }}>
        <CardMedia
          sx={{ backgroundSize: "contain" }}
          component="img"
          height="140"
          image={product.imageURL}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", placeContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Gender: {product.gender}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Q: {quantity}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", placeContent: "space-between" }}>
          <Typography variant="body2">{product.price}</Typography>
          {quantity === 0 ? (
            <Typography>Out of Stock</Typography>
          ) : (
            <Button
              size="small"
              onClick={handleAddToCart}
              variant="contained"
              disableElevation
            >
              Add to Cart
            </Button>
          )}
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ProductCard;
