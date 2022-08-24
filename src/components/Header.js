import {
  Brightness4Outlined,
  Brightness7Outlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { States } from "../Context/Context";
import { Themes } from "../Context/Theme";

const Header = () => {
  const { cart } = States();
  const theme = useTheme();
  const colorMode = Themes();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            component="a"
            href="/"
            sx={{ flexGrow: 1, textDecoration: "none", mr: 2, fontWeight: 700 }}
          >
            TeeRex
          </Typography>
          <Box>
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Outlined />
              ) : (
                <Brightness4Outlined />
              )}
            </IconButton>
            <Link to="/cart">
              <IconButton>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
