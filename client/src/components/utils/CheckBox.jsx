import { Checkbox, Box, Typography, FormControlLabel } from "@mui/material";

const CheckBox = ({ changeHandler, checked, label }) => {
  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      p: 1,
      borderRadius: 2,
      transition: "all 0.2s ease",
      "&:hover": { backgroundColor: "rgba(0,0,0,0.02)" }
    }}>
      <Typography sx={{ fontWeight: 600, color: "text.primary" }}>{label}</Typography>
      <Checkbox 
        onChange={changeHandler} 
        checked={checked} 
        sx={{ 
          color: "primary.main",
          "&.Mui-checked": { color: "primary.main" }
        }}
      />
    </Box>
  );
};

export default CheckBox;
