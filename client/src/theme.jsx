import { createTheme } from "@mui/material/styles";

export const userTheme = createTheme({
  palette: {
    primary: {
      main: "#00A19B",
      contrastText: "#ffffff",
    },
    background: {
      default: "#E4DDD3",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#CCDA47",
      contrastText: "#0A3625",
    },
    background: {
      default: "#0A3625",
      paper: "#124534",
    },
    text: {
      primary: "#CCDA47",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});
