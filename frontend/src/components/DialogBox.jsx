import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import useAuthService from "../services/AuthService";

function DialogBox({ id, open, text, onClose, flag }) {
  const { deleteCourseById, deleteUserById } = useAuthService();

  const handleDelete = async (id) => {
    console.log("hii from DialogBox")
    if (flag === "admin") {
      await deleteCourseById(id);
    } else {
      await deleteUserById(id);
    }
    onClose()
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete(id)}>Yes</Button>
          <Button onClick={() => onClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogBox;
