import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  uploadImage,
  getUploadUserImageStatus,
  getUpdateUserStatus,
  getUserToEdit,
  setEditUserProfileForm,
  cleanUploadImageStatus,
  fetchUsers,
  cleanUpdatedUserDataStatus,
} from "../../features/usersManagementSlice";
import { Card, Button, TextField, Typography, Grid, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { motion } from "framer-motion";

const EditProfile = () => {
  const dispatch = useDispatch();
  const updateUserStatus = useSelector(getUpdateUserStatus);
  const uploadUserImageStatus = useSelector(getUploadUserImageStatus);
  const userToEdit = useSelector(getUserToEdit);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setValues({
        email: userToEdit.email,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
      });
    }

    if (updateUserStatus?.message) {
      dispatch(cleanUploadImageStatus());
      dispatch(cleanUpdatedUserDataStatus());
      dispatch(fetchUsers({ firstItem: 0, lastItem: 10 }));
      dispatch(setEditUserProfileForm(false));
      navigate("/");
    }
  }, [updateUserStatus, userToEdit]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  if (!userToEdit) return <Navigate to="/" />;

  const clickSubmit = () => {
    const user = {
      param: userToEdit._id,
      data: {
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        email: values.email || undefined,
        userImage: uploadUserImageStatus.imageUrl || userToEdit.userImage,
      },
    };
    dispatch(updateUserData(user));
  };

  const uploadPhoto = () => document.getElementById("userImage").click();

  const handleUpload = (event) => {
    let formData = new FormData();
    formData.append(
      "userImage",
      event.target.files[0],
      `userImage${userToEdit._id}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`,
    );
    dispatch(uploadImage(formData));
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ p: 2 }}
    >
      <Card
        sx={{
          maxWidth: 800,
          margin: "auto",
          mt: 8,
          p: 4,
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          backgroundColor: "background.paper",
        }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          id="userImage"
          onChange={handleUpload}
        />
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: 800, textAlign: "center" }}
        >
          Edit Profile
        </Typography>

        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={
                uploadUserImageStatus.imageUrl ||
                userToEdit?.userImage ||
                userImagePlaceholder
              }
              style={{
                width: 160,
                height: 160,
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #f5f5f5",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                marginBottom: "16px",
              }}
              alt="Profile"
            />
            <Button
              variant="outlined"
              onClick={uploadPhoto}
              sx={{ borderRadius: "10px", fontWeight: 700 }}
            >
              Change Photo
            </Button>
            {uploadUserImageStatus?.error && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {uploadUserImageStatus.error}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField
                label="First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleChange("firstName")}
                fullWidth
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleChange("lastName")}
                fullWidth
              />
              <TextField
                label="Email Address"
                variant="outlined"
                value={values.email}
                onChange={handleChange("email")}
                fullWidth
              />

              {updateUserStatus?.error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ mt: 2, fontWeight: 600 }}
                >
                  {updateUserStatus.error}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={clickSubmit}
                  sx={{ borderRadius: "12px", py: "10px", fontWeight: 700 }}
                  fullWidth
                  disableElevation
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  sx={{
                    borderRadius: "12px",
                    py: "10px",
                    fontWeight: 700,
                    backgroundColor: "rgba(0,0,0,0.05)",
                    color: "rgba(0,0,0,0.6)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
                  }}
                  fullWidth
                  disableElevation
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default EditProfile;
