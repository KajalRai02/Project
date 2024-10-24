import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {useDispatch} from 'react-redux'
import { deleteCourses } from "../store/dashboardSlice";
import useAuthService from "../services/AuthService";

 function DialogBox({ open, text,id }) {

  const dispatch=useDispatch()
  const {deleteCourseById} = useAuthService()

  const handleDelete= async(id)=> {
    await deleteCourseById(id)
    // dispatch(deleteCourses(id));
    console.log("deleting")
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleDelete(id)}>Yes</Button>
          <Button>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default DialogBox;