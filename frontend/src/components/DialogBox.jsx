import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function DialogBox({ open, text }) {
  function handleDelete() {
    console.log("Deleting");
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
