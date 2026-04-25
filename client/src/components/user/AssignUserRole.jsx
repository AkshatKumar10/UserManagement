import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { indexOf } from "lodash";
import {
  assignRole,
  cleanAssignRoleStatus,
  fetchUsers,
  getAssignRoleModalStatus,
  getAssignRoleStatus,
  getUsersDisplayPage,
  getUserToEdit,
  setAssignRoleModal,
} from "../../features/usersManagementSlice";
import CloseIcon from "@mui/icons-material/Close";
import CheckBox from "../utils/CheckBox";
import { Dialog, DialogContent, Tooltip, Typography, IconButton, Box } from "@mui/material";
import { motion } from "framer-motion";

const AssignUserRole = () => {
  const dispatch = useDispatch();
  const userToEdit = useSelector(getUserToEdit);
  const assignRoleModalStatus = useSelector(getAssignRoleModalStatus);
  const assignRoleStatus = useSelector(getAssignRoleStatus);
  const page = useSelector(getUsersDisplayPage);

  useEffect(() => {
    if (assignRoleStatus?.message) {
      const users = {
        firstItem: page * 10 - 10,
        lastItem: page * 10,
        accountStatus: "active",
      };
      dispatch(fetchUsers(users));
      dispatch(cleanAssignRoleStatus());
      dispatch(setAssignRoleModal(false));
      setCheckedField([...Array(4).fill(false)]);
    }
  }, [assignRoleStatus]);

  const [checkedField, setCheckedField] = useState([...Array(4).fill(false)]);

  const roles = ["student", "mentor", "admin"];
  const labels = ["Student", "Mentor", "Admin"];

  const handleChange = (name) => (event) => {
    const index = roles.indexOf(name);
    const arr = [...Array(4).fill(false)];
    arr[index] = true;

    setCheckedField([...arr]);

    const data = {
      param: userToEdit._id,
      userRole: name,
    };

    dispatch(assignRole(data));
  };

  return (
    <Dialog 
      open={assignRoleModalStatus}
      onClose={() => dispatch(setAssignRoleModal(false))}
      PaperProps={{
        sx: { borderRadius: 4, width: '100%', maxWidth: 400, p: 1 }
      }}
    >
      {userToEdit && (
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pt: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Assign User Role
            </Typography>
            <IconButton onClick={() => dispatch(setAssignRoleModal(false))} size="small">
              <CloseIcon sx={{ color: "text.secondary" }} />
            </IconButton>
          </Box>
          <DialogContent>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              Selecting a new role for <strong>{userToEdit.firstName} {userToEdit.lastName}</strong> will update their access levels immediately.
            </Typography>
            {roles.map((item, index) => (
              <Box key={item} sx={{ mb: 1 }}>
                <CheckBox
                  label={labels[index]}
                  checked={
                    checkedField.some(Boolean)
                       ? checkedField[index]
                       : roles[index] === (userToEdit.role || "student")
                  }
                  changeHandler={handleChange(roles[index])}
                />
              </Box>
            ))}
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default AssignUserRole;
