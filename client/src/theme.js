import { createTheme } from "@mui/material/styles";

export const userTheme = createTheme({
  palette: {
    primary: {
      main: "#00A19B",
      contrastText: "#ffffff",
    },
    background: {
      default: "#E4DDD3",
      paper: "#ffffff",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#4A4A4A",
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

export const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#1A1A1A", // Black
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F5F5", // Light Grey
      paper: "#ffffff",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
    },
    secondary: {
      main: "#E0E0E0", // Darker Grey
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h3: { fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A1A" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em", color: "#1A1A1A" },
    h6: { fontWeight: 600, color: "#1A1A1A" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1A1A1A",
          color: "#ffffff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#1A1A1A",
          color: "#ffffff",
          fontWeight: 700,
        },
      },
    },
  },
});
