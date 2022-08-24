import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const Context = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUrl = `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`;
    axios
      .get(fetchUrl)
      .then((res) => {
        setproducts(res.data);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <AppContext.Provider value={{ products, cart, setcart, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const States = () => {
  return useContext(AppContext);
};

export default Context;
