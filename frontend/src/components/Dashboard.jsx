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
import { useSelector } from "react-redux";
import CircularSpinner from "./Forms/CircularSpinner";

function Dashboard({ arr, flag }) {
  const { updateCourseStatus, updateUserStatus, updateCourse } =
    useAuthService();

  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null); 

  const handleEditOpen = (id) => setEditId(id);
  const handleEditClose = () => setEditId(null); 

  const loading = useSelector((state) => state.loading.loading);

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  function handleClose() {
    console.log("this is handleClose function in Dashboard")
    setTimeout(()=>{
      setDeleteId(null);
      setOpen(false);

    })
    
    
  }

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
              <TableCell>
                {flag === "admin" ? "Course Name" : "User Name"}
              </TableCell>
              {flag === "admin" && <TableCell>Edit</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {flag === "admin" ? item.courseName : item.userName}
                </TableCell>
                {flag === "admin" && (
                  <TableCell>
                    <IconButton onClick={() => handleEditOpen(item.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleStatus(item.id, item.active)}
                  >
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

      {editId &&
        (loading ? (
          <CircularSpinner />
        ) : (
          <EditForm
            open={Boolean(editId)}
            close={handleEditClose}
            id={editId}
            name={arr.find((item) => item.id === editId)?.courseName || ""}
            type="course"
            apiCalls={updateCourse}
            courseId={editId}
          />
        ))}
    </>
  );
}

export default Dashboard;
