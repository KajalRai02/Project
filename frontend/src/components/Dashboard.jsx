import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  
  import EditIcon from '@mui/icons-material/Edit';
  import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
  import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { DUMMY_COURSES } from "./CoursesList";
  
  
  
  export default function Dashboard() {
    return (
      <>
        <TableContainer container={Paper} sx={{bgcolor:"mintcream"}}>
          <Table stickyHeader>
            <TableHead sx={{bgcolor:"teal"}}>
              <TableRow >
                <TableCell>Index</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DUMMY_COURSES.map((course,index) => (
                  <TableRow key={course.title}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell><EditIcon/></TableCell>
                    <TableCell>{course.status ? <RadioButtonCheckedIcon/> : <RadioButtonUncheckedIcon/> }</TableCell>
                    <TableCell><DeleteIcon/></TableCell>
                  </TableRow>
              ))}
  
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }