import React from "react";
import { Grid, Typography, Toolbar, AppBar, Button, Box } from "@mui/material";
import Search from "../utils/Search";
import { useDispatch, useSelector } from "react-redux";
import { signout, getLoggedUser, cleanStore } from "../../features/usersManagementSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUser);

  const onSignout = () => {
    dispatch(signout());
    dispatch(cleanStore());
    navigate("/login");
  };

  const isAdmin = loggedUser?.user?.role === "admin";

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: "primary.main", 
        color: "primary.contrastText",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        py: 1
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              {isAdmin ? "ADMIN" : "PORTAL"}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            {isAdmin && <Search />}
          </Grid>

          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
              <Box sx={{ textAlign: "right", display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="caption" sx={{ opacity: 0.7, display: "block", lineHeight: 1 }}>Logged in as</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{loggedUser?.user?.firstName}</Typography>
              </Box>
              <Button 
                variant="contained"
                disableElevation
                onClick={onSignout} 
                startIcon={<LogoutIcon />}
                sx={{ 
                  backgroundColor: "rgba(255,255,255,0.1)", 
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                  borderRadius: "10px",
                  fontWeight: 700
                }}
              >
                Sign out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
