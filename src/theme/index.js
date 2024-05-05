import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9B4849",
      contrastText: "#fff",
    },
    secondary: {
      main: "#212529",
    },
    textPrimary: {
      main: "#000000",
    },

    bgBlue: {
      main: "#1A73E9",
    },
    bgViolet: {
      main: "#8E67BE",
    },
    bgPink: {
      main: "#FF92B0",
    },
    bgWhite: {
      main: "#FFFFFF",
    },
  },
});

export default theme;
