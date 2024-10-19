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

export default function Dashboard({ arr, flag }) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen((prev) => !prev);
  }
  function handleEdit() {
    console.log("Editing");
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
              <TableRow key={flag === "admin" ? item.title : item.username}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {flag === "admin" ? item.title : item.username}
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    {item.status ? (
                      <RadioButtonCheckedIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleClick}>
                    <DeleteIcon />
                    {open && (
                      <DialogBox open={open} text="Do you want to delete?" />
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
