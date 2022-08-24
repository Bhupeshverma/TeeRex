import { CssBaseline, Drawer, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { States } from "../Context/Context";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import PropTypes from "prop-types";
import SearchFilter from "./SearchFilter";

const drawerWidth = 240;
const Home = (props) => {
  const { window } = props;
  let { products, loading } = States();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    setFilterData(products);
    
  }, [products]);

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFilteredData = (filters, type) => {
    let data = [];
    if (filters.length > 0) {
        filters.forEach((element) => {
          data = [
            ...data,
            ...products.filter(
              (product) =>
                product.color === element ||
                product.gender === element ||
                product.type === element ||
                product.price >= element.split("-")[0] && product.price <= element.split("-")[1]
            ),
          ];
        });
      setFilterData(data);
    } else {
      setFilterData(products);
    }
  };
  const handleSearch = (value) => {
    if (value.length > 0) {
      let data = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(data);
    } else {
      setFilterData(products);
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 10 }}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            container={container}
            varient="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <Filters
              products={products}
              handleFilteredData={handleFilteredData}
            />
          </Drawer>
          <Paper
            sx={{
              display: { xs: "none", sm: "block" },
              width: drawerWidth,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}
          >
            <Filters
              products={products}
              handleFilteredData={handleFilteredData}
            />
          </Paper>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pl: 3,
            pr: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mb: 2,
          }}
        >
          <SearchFilter
            handleSearch={handleSearch}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignContent="center"
            sx={{ borderRadius: 8, mt: 1 }}
          >
            {
                loading ? 
                Array(6).fill('').map((item,index) => (
                    <Grid item key={index}>
                        <Skeleton variant="rectangular" width={250} height={170} />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                )):
                filterData.length > 0 ?
                (filterData.map((product, index) => {
                    return (
                      <Grid item key={index}>
                        <ProductCard product={product} />
                      </Grid>
                    );
                  }))
                :
                (<Box>
                    <Typography variant="h6" component="div">No Results Found</Typography>
                </Box>)
            }
            
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

Home.propTypes = {
  window: PropTypes.func,
};

export default Home;
