import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogBox from "./DialogBox";
import { useState } from "react";
 import useAuthService from "../services/AuthService";


 function Dashboard({ arr, flag }) {

  const  {updateCourseStatus} =useAuthService();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId]= useState(null)

  function handleDelete(id) {
    setDeleteId(id)
    setOpen((prev) => !prev);
  }
  function handleClose(){
    setOpen(false)
    setDeleteId(null)
  }
  function handleEdit() {
    console.log("Editing");
  }
  const handleStatus=async(id,status)=>{
    let activeId;
    if(status==true){
      activeId=0;
    }else{
      activeId=1;
    }
    try{
      console.log(status);
      await updateCourseStatus(id,status,activeId)
    }catch{
      console.log("error")
    }
    
  }


  return (
    <>
      <TableContainer container={Paper} sx={{ bgcolor: "mintcream" }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: "teal" }}>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>
                {flag === "admin" ? "Course Name" : "User Name"}
              </TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((item, index) => (
              <TableRow key={flag === "admin" ? index : index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {flag === "admin" ? item.courseName : item.userName}
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={()=>handleStatus(item.id, item.active)}>
                    {item.active ? (
                      <RadioButtonCheckedIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={()=> handleDelete(item.id)}>
                    <DeleteIcon />
                    {open && deleteId === item.id && (
                      <DialogBox 
                      id={item.id} 
                      open={open} 
                      text="Do you want to delete?"
                      onClose= {handleClose}
                      />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard
