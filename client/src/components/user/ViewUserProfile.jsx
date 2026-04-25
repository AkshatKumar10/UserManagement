import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../features/usersManagementSlice";
import {
  Card,
  Button,
  Typography,
  Grid,
  Box,
  Divider
} from "@mui/material";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
    backgroundColor: theme.palette.background.paper,
    textAlign: "center"
  },
  image: {
    width: 140,
    height: 140,
    objectFit: "cover",
    borderRadius: "50%",
    border: `4px solid ${theme.palette.background.default}`,
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    marginBottom: theme.spacing(3),
  },
  infoBox: {
    textAlign: "left",
    padding: theme.spacing(2),
  },
  label: {
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px"
  },
  value: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: "1.1rem",
    marginBottom: "16px"
  }
}));

const ViewUserProfile = () => {
  const classes = useStyles();
  const userToView = useSelector(getUserProfile);
  const navigate = useNavigate();

  return (
    <Box component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} sx={{ p: 2 }}>
      <Card className={classes.card}>
        <img
          src={userToView?.userImage || userImagePlaceholder}
          className={classes.image}
          alt="Profile"
        />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>User Details</Typography>
        
        <Box className={classes.infoBox}>
          <Typography className={classes.label}>First Name</Typography>
          <Typography className={classes.value}>{userToView.firstName}</Typography>
          
          <Typography className={classes.label}>Last Name</Typography>
          <Typography className={classes.value}>{userToView.lastName}</Typography>
          
          <Typography className={classes.label}>Email Address</Typography>
          <Typography className={classes.value}>{userToView.email}</Typography>
          
          <Typography className={classes.label}>Current Role</Typography>
          <Typography className={classes.value} sx={{ textTransform: "capitalize" }}>{userToView.role}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/")}
          sx={{ 
            borderRadius: "12px", 
            py: 1.5, 
            fontWeight: 700,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
          }}
        >
          Return to Dashboard
        </Button>
      </Card>
    </Box>
  );
};

export default ViewUserProfile;
