import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";


import useAuthService from "../services/AuthService";

 function DialogBox({ open, text,id ,flag, onClose}) {

 
  const {deleteCourseById, deleteUserById} = useAuthService()

  const handleDelete= async(id)=> {
    if(flag === 'admin'){
      await deleteCourseById(id)
     
    }else{
      
      await deleteUserById(id)
    }    
  }
  
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleDelete(id)}>Yes</Button>
          <Button onClick={()=>onClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default DialogBox;