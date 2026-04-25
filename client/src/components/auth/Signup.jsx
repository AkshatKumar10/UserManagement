import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../features/usersManagementSlice";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";

const Signup = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const clickSubmit = async () => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const result = await dispatch(createUser(user));
    if (result.payload.error) {
      setValues({ ...values, error: result.payload.error });
    } else {
      setValues({ ...values, success: true });
      setTimeout(() => navigate("/login"), 2000);
    }
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
            Join thousands of professionals managing their work with ease.
          </Typography>
        </motion.div>
        
        {/* Subtle Background Pattern */}
        <Box sx={{ 
          position: "absolute", 
          top: -50, 
          left: -50, 
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
        p: { xs: 2, md: 8 },
        overflowY: "auto"
      }}>
        <Paper
          elevation={0}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 550,
            borderRadius: 6,
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#00A19B", fontWeight: 800, letterSpacing: "-0.04em" }}>
            Join the Workspace
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Create your account in seconds.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange("firstName")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange("lastName")}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={values.email}
            onChange={handleChange("email")}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={values.password}
            onChange={handleChange("password")}
            sx={{ mt: 1 }}
          />

          {values.error && (
            <Typography variant="body2" sx={{ color: "error.main", mt: 1, fontWeight: 600 }}>
              {values.error}
            </Typography>
          )}

          {values.success && (
            <Typography variant="body2" sx={{ color: "success.main", mt: 1, fontWeight: 600 }}>
              Account created! Redirecting...
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
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{ color: "#00A19B", fontWeight: 700 }}
            >
              Log In
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Signup;
