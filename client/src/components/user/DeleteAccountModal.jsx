import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanUserDeletedMessageStatus,
  fetchUsers,
  getDeleteAccountModal,
  getDeleteUserMessage,
  getUsersDisplayPage,
  getUserToDelete,
  removeUser,
  setDeleteAccountModal,
} from "../../features/usersManagementSlice";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { motion } from "framer-motion";

const DeleteAccountModal = () => {
  const dispatch = useDispatch();
  const deleteAccountModalStatus = useSelector(getDeleteAccountModal);
  const userToDelete = useSelector(getUserToDelete);
  const deleteUserStatus = useSelector(getDeleteUserMessage);
  const [userDeleted, setUserDeleted] = useState(false);
  const page = useSelector(getUsersDisplayPage);

  useEffect(() => {
    if (deleteUserStatus.message) {
      dispatch(cleanUserDeletedMessageStatus());
      dispatch(fetchUsers({
        firstItem: page * 10 - 10,
        lastItem: page * 10,
        accountStatus: "active",
      }));
      setUserDeleted(true);
      setTimeout(() => {
        dispatch(setDeleteAccountModal(false));
        setUserDeleted(false);
      }, 1500);
    }
  }, [deleteUserStatus]);

  return (
    <Dialog 
      open={deleteAccountModalStatus} 
      onClose={() => dispatch(setDeleteAccountModal(false))}
      PaperProps={{
        sx: { borderRadius: 4, width: '100%', maxWidth: 400, textAlign: "center", p: 2 }
      }}
    >
      <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => dispatch(setDeleteAccountModal(false))} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ pb: 0 }}>
          <WarningAmberRoundedIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Delete Account</Typography>
          <Typography variant="body2" color="text.secondary">
            Are you sure you want to deactivate <strong>{userToDelete?.firstName}'s</strong> account? This action can be undone by an admin later.
          </Typography>
        </DialogContent>

        {!userDeleted ? (
          <Box sx={{ p: 3, display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={() => dispatch(removeUser(userToDelete._id))}
              sx={{ borderRadius: "12px", py: 1.5, fontWeight: 700 }}
            >
              Delete
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => dispatch(setDeleteAccountModal(false))}
              sx={{ borderRadius: "12px", py: 1.5, fontWeight: 700, borderColor: "rgba(0,0,0,0.1)", color: "text.primary" }}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: "success.main", fontWeight: 700 }}>
              User Deactivated!
            </Typography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default DeleteAccountModal;
