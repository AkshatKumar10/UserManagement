import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  getFilter,
  setFilter,
  setFilterTerm,
} from "../../features/usersManagementSlice";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ changeHandler }) {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleKeyPress = (event) => {
    if (event.target.value === "") {
      const users = {
        firstItem: 0,
        lastItem: 10,
        filterTerm: undefined,
        role: undefined,
        accountStatus: "active",
      };

      dispatch(setFilterTerm(filter));
      return dispatch(fetchUsers(users));
    }

    if (event.keyCode === 13) {
      const users = {
        firstItem: 0,
        lastItem: 10,
        role: undefined,
        accountStatus: "active",
        filterTerm: event.target.value.toLowerCase(),
      };

      dispatch(setFilterTerm(filter));
      return dispatch(fetchUsers(users));
    }
  };

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Box sx={{ px: 2, mt: { xs: 1, md: 0 } }}>
      <TextField
        fullWidth
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
            </InputAdornment>
          ),
          disableUnderline: true,
        }}
        placeholder="Search for anything..."
        value={filter}
        variant="standard"
        sx={{
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "12px",
          px: 2,
          py: 0.8,
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease",
          "&:focus-within": {
            backgroundColor: "rgba(255,255,255,0.12)",
            borderColor: "rgba(255,255,255,0.2)",
          },
          "& input": { 
            color: "#ffffff",
            fontSize: "0.95rem",
            fontWeight: 500,
            "&::placeholder": { color: "rgba(255,255,255,0.4)", opacity: 1 }
          },
        }}
      />
    </Box>
  );
}
