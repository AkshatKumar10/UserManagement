import React from "react";
import "./App.css";
import MainRouter from "./MainRouter";
import { userTheme, adminTheme } from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { getLoggedUser } from "./features/usersManagementSlice";

const App = () => {
  const loggedUser = useSelector(getLoggedUser);
  const theme = loggedUser?.user?.role === "admin" ? adminTheme : userTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <MainRouter />
      </div>
    </ThemeProvider>
  );
};

export default App;
