import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";


export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#65558F',
      contrastText: '#322f35',
    },
    secondary: {
      main: '#312753',
    },
    background: {
      default: '#A89BB9',
    },
  },
  typography: {
    fontFamily: 'Scope One',
  },
});

export default function Palette({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}