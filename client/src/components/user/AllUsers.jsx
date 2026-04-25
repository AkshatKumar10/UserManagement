import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  getUsers,
  getUsersDisplayPage,
  setUsersDisplayPage,
  fetchUsers,
  setUserToEdit,
  setDeleteAccountModal,
  setUserToDelete,
  setAssignRoleModal,
  setUserToView,
} from "../../features/usersManagementSlice";
import {
  Grid,
  Tooltip,
  Button,
  useMediaQuery,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TableComponents from "../utils/Table";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
import { motion } from "framer-motion";

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const page = useSelector(getUsersDisplayPage);

  const rows = [];

  useEffect(() => {
    dispatch(setUsersDisplayPage(1));
    const users = {
      firstItem: 0,
      lastItem: 10,
      role: filters.role,
      accountStatus: "active",
      filterTerm: undefined,
    };
    dispatch(fetchUsers(users));
  }, [dispatch]);

  const [filters, setFilters] = useState({
    filterStatus: "All",
    accountStatus: "isActive",
    sortByFirstname: false,
    sortByLastname: false,
    sortFirstname: "A-Z",
    sortLastname: "",
  });

  const sortFirstName = () => {
    setFilters({
      ...filters,
      sortFirstname: filters.sortFirstname === "A-Z" ? "Z-A" : "A-Z",
      sortByFirstname: true,
      sortByLastname: false,
    });
  };

  const sortLastname = () => {
    setFilters({
      ...filters,
      sortLastname: filters.sortLastname === "A-Z" ? "Z-A" : "A-Z",
      sortByFirstname: false,
      sortByLastname: true,
    });
  };

  const columns = [
    {
      id: "firstName",
      label: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={sortFirstName}
        >
          First Name{" "}
          {filters.sortFirstname === "A-Z" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </Box>
      ),
      minWidth: 120,
      align: "center",
    },
    {
      id: "lastName",
      label: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={sortLastname}
        >
          Last Name{" "}
          {filters.sortLastname === "A-Z" ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </Box>
      ),
      minWidth: 120,
      align: "center",
    },
    { id: "email", label: "Email", minWidth: 180, align: "center" },
    { id: "assignRole", label: "Permission", minWidth: 150, align: "center" },
    { id: "role", label: "Current Role", minWidth: 120, align: "center" },
    { id: "actions", label: "Actions", minWidth: 150, align: "center" },
  ];

  const createRows = () => {
    if (users?.data) {
      _.chain(Object.values(users.data))
        .orderBy(
          [
            filters.sortByFirstname
              ? (u) => u.firstName.toLowerCase()
              : filters.sortByLastname
              ? (u) => u.lastName.toLowerCase()
              : null,
          ],
          [
            filters.sortByFirstname
              ? filters.sortFirstname === "A-Z"
                ? "asc"
                : "desc"
              : filters.sortByLastname
              ? filters.sortLastname === "A-Z"
                ? "asc"
                : "desc"
              : null,
          ],
        )
        .map((item) => {
          rows.push({
            firstName: (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.firstName}
                </Typography>
                {item.status === "deactivated" && (
                  <Typography variant="caption" color="error">
                    (deleted)
                  </Typography>
                )}
              </Box>
            ),
            lastName: <Typography variant="body2">{item.lastName}</Typography>,
            email: (
              <Typography variant="body2" color="text.secondary">
                {item.email}
              </Typography>
            ),
            assignRole: (
              <Button
                size="small"
                onClick={() => assignRole(item._id)}
                variant="outlined"
                sx={{
                  borderRadius: "30px",
                  textTransform: "none",
                  fontWeight: 700,
                  px: "24px",
                }}
                disabled={item.status === "deactivated"}
              >
                Assign
              </Button>
            ),
            role: (
              <Typography
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "20px",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {item.role || "student"}
              </Typography>
            ),
            actions:
              item.status !== "deactivated" ? (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  <IconButton size="small" onClick={() => edit(item._id)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => remove(item._id)}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                  <IconButton size="small" onClick={() => view(item._id)}>
                    <RemoveRedEyeIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : null,
          });
        })
        .value();
    }
  };

  const edit = (id) => {
    dispatch(setUserToEdit(id));
    navigate("/editProfile");
  };
  const remove = (id) => {
    dispatch(setUserToDelete(id));
    dispatch(setDeleteAccountModal(true));
  };
  const view = (id) => {
    dispatch(setUserToView(id));
    navigate("/viewProfile");
  };
  const assignRole = (id) => {
    dispatch(setUserToEdit(id));
    dispatch(setAssignRoleModal(true));
  };

  const handlePagination = (event, value) => {
    const users = {
      ...filters,
      firstItem: value * 10 - 10,
      lastItem: value * 10,
      accountStatus:
        filters.accountStatus === "isActive"
          ? "active"
          : filters.accountStatus === "isDeactivated"
          ? "deactivated"
          : undefined,
      role:
        filters.filterStatus === "isStudent"
          ? "student"
          : filters.filterStatus === "isAdmin"
          ? "admin"
          : filters.filterStatus === "isMentor"
          ? "mentor"
          : "",
    };
    dispatch(setUsersDisplayPage(value));
    dispatch(fetchUsers(users));
  };

  const handleChange = (name) => (event) => {
    const val = event.target.value;
    const newFilters = { ...filters, [name]: val };
    setFilters(newFilters);

    const usersReq = {
      firstItem: 0,
      lastItem: 10,
      accountStatus:
        (name === "accountStatus" ? val : filters.accountStatus) === "isActive"
          ? "active"
          : (name === "accountStatus" ? val : filters.accountStatus) ===
            "isDeactivated"
          ? "deactivated"
          : undefined,
      role:
        (name === "filterStatus" ? val : filters.filterStatus) === "isStudent"
          ? "student"
          : (name === "filterStatus" ? val : filters.filterStatus) === "isAdmin"
          ? "admin"
          : (name === "filterStatus" ? val : filters.filterStatus) ===
            "isMentor"
          ? "mentor"
          : "",
    };
    dispatch(fetchUsers(usersReq));
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ marginBottom: "40px", textAlign: "center" }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          User Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage system roles and permissions
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              mb: 4,
            }}
          >
            <SelectComponent
              label="Filter By Role"
              array={["All", "isMentor", "isStudent", "isAdmin"]}
              selectedValue={filters.filterStatus}
              handleChange={handleChange("filterStatus")}
            />
            <SelectComponent
              label="Account Status"
              array={["All", "isActive", "isDeactivated"]}
              selectedValue={filters.accountStatus}
              handleChange={handleChange("accountStatus")}
            />
          </Box>

          <Box
            sx={{
              marginTop: "32px",
              backgroundColor: "background.paper",
              borderRadius: "20px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <TableComponents
              rows={rows}
              columns={columns}
              createData={() => {}}
              createRows={createRows}
            />
          </Box>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            {users?.data && Math.ceil(users.totalNumOfUsers / 10) > 1 && (
              <PaginationComponent
                page={page}
                handleChange={handlePagination}
                numberOfPages={Math.ceil(users.totalNumOfUsers / 10)}
                numberOfItems={Object.keys(users.data).length}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllUsers;
