// themeConfig.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  direction: "rtl",
  palette: {
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    primary: {
      light: "#e6f3ff",
      main: "#2e7d96",
      dark: "#1a5469",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#e7f4ef",
      main: "#4a9d7c",
      dark: "#2c7a5d",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#64748b",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
  },
});

export const darkTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      light: "#4f9dff",
      main: "#2979ff",
      dark: "#1c54b2",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#89f1c6",
      main: "#00e676",
      dark: "#00b248",
      contrastText: "#000000",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    divider: "#373737",
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
  },
});
