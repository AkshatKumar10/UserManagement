import { Select, MenuItem, Box, Typography } from "@mui/material";

const SelectComponent = ({
  handleChange,
  selectedValue,
  array,
  disabled,
  className,
  label,
}) => {
  return (
    <Box sx={{ minWidth: 220, m: 1 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.5, display: "block", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </Typography>
      <Select
        fullWidth
        onChange={handleChange}
        value={selectedValue}
        disabled={disabled}
        sx={{
          height: 48,
          backgroundColor: "background.paper",
          borderRadius: "12px",
          color: "text.primary",
          fontWeight: 600,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0,0,0,0.1)",
            borderWidth: "1px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            borderWidth: "2px",
          },
        }}
      >
        {array.map((item, index) => {
          return (
            <MenuItem key={index} value={item} sx={{ fontWeight: 500 }}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectComponent;
