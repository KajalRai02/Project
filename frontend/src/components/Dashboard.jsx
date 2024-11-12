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
import EditForm from "./EditForm";

function Dashboard({ arr, flag }) {
  const { updateCourseStatus, updateUserStatus, updateCourse } = useAuthService();

  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Using only editId to control edit form visibility

  const handleEditOpen = (id) => setEditId(id);
  const handleEditClose = () => setEditId(null); // Close by setting editId to null

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleStatus = async (id, status) => {
    const activeId = status ? 0 : 1;
    try {
      if (flag === "admin") {
        await updateCourseStatus(id, status, activeId);
      } else {
        await updateUserStatus(id, status, activeId);
      }
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: "mintcream" }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: "teal" }}>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>{flag === "admin" ? "Course Name" : "User Name"}</TableCell>
              {flag === "admin" && <TableCell>Edit</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{flag === "admin" ? item.courseName : item.userName}</TableCell>
                {flag === "admin" && (
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(item.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell>
                  <IconButton onClick={() => handleStatus(item.id, item.active)}>
                    {item.active ? (
                      <RadioButtonCheckedIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                    {open && deleteId === item.id && (
                      <DialogBox
                        id={item.id}
                        open={open}
                        text="Do you want to delete?"
                        onClose={handleClose}
                        flag={flag}
                      />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Conditionally render EditForm based on editId */}
      {editId && (
        <EditForm
          open={Boolean(editId)}
          close={handleEditClose}
          id={editId}
          name={arr.find((item) => item.id === editId)?.courseName || ""}
          type="course"
          apiCalls={updateCourse}
          courseId={editId}
        />
      )}
    </>
  );
}

export default Dashboard;





























// import {
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DialogBox from "./DialogBox";
// import { useState } from "react";
// import useAuthService from "../services/AuthService";
// import EditForm from "./EditForm";

// function Dashboard({ arr, flag }) {
//   const { updateCourseStatus, updateUserStatus } = useAuthService();

//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const [openEdit, setOpenEdit] = useState(false);
//   const [editId,setEditId]=useState(null)

//   function handleEditOpen(id) {
//     setEditId(id)
//     setOpenEdit(true);
    
//   }
//   function handleEditClose() {
//     setOpenEdit(false);
//     console.log("hello")
//     setEditId(null)
//   }

//   function handleDelete(id) {
//     setDeleteId(id);
//     setOpen((prev) => !prev);
//   }
//   function handleClose() {
//     setOpen(false);
//     setDeleteId(null);
//   }

//   const handleStatus = async (id, status) => {
//     let activeId;
//     if (status == true) {
//       activeId = 0;
//     } else {
//       activeId = 1;
//     }
//     try {
//       console.log(status);
//       if(flag==='admin'){
//         await updateCourseStatus(id, status, activeId);
//       }else{
//        console.log('superadmin')
//         await updateUserStatus(id, status, activeId);
//       }
      
//     } catch {
//       console.log("error");
//     }
//   };

//   return (
//     <>
//       <TableContainer container={Paper} sx={{ bgcolor: "mintcream" }}>
//         <Table stickyHeader>
//           <TableHead sx={{ bgcolor: "teal" }}>
//             <TableRow>
//               <TableCell>Index</TableCell>
//               <TableCell>
//                 {flag === "admin" ? "Course Name" : "User Name"}
//               </TableCell>
//               {flag === "admin" && <TableCell>Edit</TableCell>}
//               <TableCell>Status</TableCell>
//               <TableCell>Delete</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {arr.map((item, index) => (
//               <TableRow key={flag === "admin" ? index : index}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>
//                   {flag === "admin" ? item.courseName : item.userName}
//                 </TableCell>
//                {flag === "admin" && <TableCell>
//                   <IconButton onClick={()=>handleEditOpen(item.id)}>
//                     <EditIcon />
//                     {openEdit && item.id === editId &&(
//                       <EditForm
//                         open={openEdit}
//                         close={handleEditClose}
//                         id={item.id}
//                         name={item.courseName}
//                       />
//                     )}
//                   </IconButton>
//                 </TableCell> }
//                 <TableCell>
//                   <IconButton
//                     onClick={() => handleStatus(item.id, item.active)}
//                   >
//                     {item.active ? (
//                       <RadioButtonCheckedIcon color="success" />
//                     ) : (
//                       <RadioButtonUncheckedIcon />
//                     )}
//                   </IconButton>
//                 </TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => handleDelete(item.id)}>
//                     <DeleteIcon />
//                     {open && deleteId === item.id && (
//                       <DialogBox
//                         id={item.id}
//                         open={open}
//                         text="Do you want to delete?"
//                         onClose={handleClose}
//                         flag= {flag}
//                       />
//                     )}
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// export default Dashboard;
