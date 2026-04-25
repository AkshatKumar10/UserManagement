import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, getLoggedUser } from "../../features/usersManagementSlice";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUser);

  useEffect(() => {
    if (loggedUser?.user && !loggedUser.error) {
      if (loggedUser.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } else if (loggedUser && loggedUser.error) {
      setValues({ ...values, error: loggedUser.error });
    }
  }, [loggedUser, navigate]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    dispatch(signin(user));
  };

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      width: "100vw", 
      overflow: "hidden",
      backgroundColor: "#f5f5f5" 
    }}>
      {/* Left Column: Branding */}
      <Box sx={{ 
        flex: 1, 
        backgroundColor: "#00A19B", 
        display: { xs: "none", md: "flex" }, 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        color: "white",
        p: 6,
        position: "relative",
        overflow: "hidden"
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: "-0.05em", mb: 2 }}>
            Workspace.
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8, fontWeight: 500, maxWidth: 400 }}>
            Streamline your productivity with our advanced management tools.
          </Typography>
        </motion.div>
        
        {/* Subtle Background Pattern */}
        <Box sx={{ 
          position: "absolute", 
          bottom: -50, 
          right: -50, 
          width: 300, 
          height: 300, 
          borderRadius: "50%", 
          backgroundColor: "rgba(255,255,255,0.1)" 
        }} />
      </Box>

      {/* Right Column: Form */}
      <Box sx={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        p: { xs: 2, md: 8 }
      }}>
        <Paper
          elevation={0}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 450,
            borderRadius: 6,
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#00A19B", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Please enter your credentials to continue.
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={values.password}
            onChange={handleChange("password")}
            sx={{ mb: 1 }}
          />

          {values.error && (
            <Typography variant="body2" sx={{ color: "error.main", mt: 1, fontWeight: 600 }}>
              {values.error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={clickSubmit}
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#00A19B",
              "&:hover": { backgroundColor: "#008a84" },
              boxShadow: "0 8px 30px rgba(0,161,155,0.2)",
              borderRadius: "12px",
              fontWeight: 700
            }}
          >
            Sign In
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/signup")}
              sx={{ color: "#00A19B", fontWeight: 700 }}
            >
              Create one
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
