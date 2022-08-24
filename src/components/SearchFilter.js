import { FilterAltOffOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import React from "react";

const SearchFilter = ({ handleSearch, handleDrawerToggle }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };
  const handleFilterToggle = () => {
    handleDrawerToggle();
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        margin: "auto",
        width: 400,
        height: 50,
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        {/* <MenuIcon /> */}
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
      />
      <Box sx={{ display: { sm: "none", xs: "flex" } }}>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="filter"
          onClick={handleFilterToggle}
        >
          <FilterAltOffOutlined />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default SearchFilter;
