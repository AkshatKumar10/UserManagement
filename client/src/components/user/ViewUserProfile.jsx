import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../features/usersManagementSlice";
import { Card, Button, Typography, Grid, Box, Divider } from "@mui/material";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { motion } from "framer-motion";

const ViewUserProfile = () => {
  const userToView = useSelector(getUserProfile);
  const navigate = useNavigate();

  const labelStyle = {
    color: "text.secondary",
    fontWeight: 700,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    mb: "4px",
  };

  const valueStyle = {
    fontWeight: 600,
    color: "text.primary",
    fontSize: "1.1rem",
    mb: "16px",
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      sx={{ p: 2 }}
    >
      <Card
        sx={{
          maxWidth: 600,
          margin: "auto",
          mt: 10,
          p: 4,
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          backgroundColor: "background.paper",
          textAlign: "center",
        }}
      >
        <img
          src={userToView?.userImage || userImagePlaceholder}
          style={{
            width: 140,
            height: 140,
            objectFit: "cover",
            borderRadius: "50%",
            border: "4px solid #f5f5f5",
            boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            marginBottom: "24px",
          }}
          alt="Profile"
        />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          User Details
        </Typography>

        <Box sx={{ textAlign: "left", p: 2 }}>
          <Typography
            sx={labelStyle}
          >
            First Name
          </Typography>
          <Typography
            sx={valueStyle}
          >
            {userToView.firstName}
          </Typography>

          <Typography
            sx={labelStyle}
          >
            Last Name
          </Typography>
          <Typography
            sx={valueStyle}
          >
            {userToView.lastName}
          </Typography>

          <Typography
            sx={labelStyle}
          >
            Email Address
          </Typography>
          <Typography
            sx={valueStyle}
          >
            {userToView.email}
          </Typography>

          <Typography
            sx={labelStyle}
          >
            Current Role
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1.1rem",
              mb: "16px",
              textTransform: "capitalize",
            }}
          >
            {userToView.role}
          </Typography>
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
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          }}
        >
          Return to Dashboard
        </Button>
      </Card>
    </Box>
  );
};

export default ViewUserProfile;
