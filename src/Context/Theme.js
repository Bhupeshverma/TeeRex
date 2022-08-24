import { createTheme, ThemeProvider } from "@mui/material";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const lightTheme = {
  palette: {
    mode: "light",
    // text: {
    //     primary: "#293462",
    //     secondary: '#293462'
    // },
    primary: {
      main: "#F6F8FC",
      dark: "#293462"
    },
    secondary: {
      main: "#293462",
    },
    background: {
      default: "#F6F8FC",
    },
  },
};

export const darkTheme = {
  palette: {
    mode: "dark",
  },
};

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  }));
  const theme = useMemo(
    () => createTheme(mode === "light" ? darkTheme : lightTheme),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
export const Themes = () => {
  return useContext(ColorModeContext);
};

export default ToggleColorMode;
