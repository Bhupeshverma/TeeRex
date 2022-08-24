import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { States } from "../Context/Context";


// Reusable ListItem component
export const ListItems = ({type, filterItems, handleToggle, checked}) => {
    return (
        <Box>
        <Typography variant="h6" component="div" sx={{p: 1, fontWeight: 700}}>{type}</Typography>
        {filterItems.map((value) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem key={value}>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value, type)}
                dense
                sx={{height: 30}}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Box>
    )
}

const Filters = ({ handleFilteredData }) => {
  const { products } = States();
  const filterByColor = [...new Set(products.map((item) => item.color))];
  const filterByType = [...new Set(products.map((item) => item.type))].slice(0,3);
  const filterByGender = [...new Set(products.map((item) => item.gender))];
  const filterByPrice = ["0-250", "251-450", "450"];

  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value, type) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    handleFilteredData(newChecked, type);
    setChecked(newChecked);
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, p: 1, height: '100vh', overflow: 'scroll' }}>
        <ListItems type="Color" filterItems={filterByColor} handleToggle={handleToggle} checked={checked}/>
        <ListItems type="Gender" filterItems={filterByGender} handleToggle={handleToggle} checked={checked}/>
        <ListItems type="Price" filterItems={filterByPrice} handleToggle={handleToggle} checked={checked}/>
        <ListItems type="Type" filterItems={filterByType} handleToggle={handleToggle} checked={checked}/>
    </List>
  );
};

export default Filters;

