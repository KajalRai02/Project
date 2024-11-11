import TextBox from "./Forms/TextBox";
import { useForm, Controller } from "react-hook-form";
import BasicButton from "./Forms/BasicButton";
import BasicModal from "./Forms/BasicModal";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import useAuthService from "../services/AuthService";
import { useState, useEffect } from "react";

function EditForm({ open, close, id, name }) {
  //const [name,setName]=useState(initialName)

  const navigate = useNavigate();
  const { updateCourse } = useAuthService();

  const { handleSubmit, control, setValue,watch } = useForm({
    defaultValues:{
      name:""
    }
  });

  watch("name")

  useEffect(() => {
    setValue("name", name);
  }, [name, setValue]);

  function handleEditLessons() {
    console.log("Id that is to be edited", id);
    console.log("navigating");
    navigate(`/courseView/${id}`);
  }

  const onSubmit = async (data) => {
    try {
      console.log("Submitting change data");
      console.log(data.name);
      await updateCourse(id, data.name);
      close();
    } catch {
      console.log("error updating data");
    }
  };
  return (
    <>
      <BasicModal open={open} close={close}>
        
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
              Edit Form
            </Typography>

            <FormControl>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Course Name:
                </Typography>
                <Controller
                  control={control}
                  name="name"
                  render={({ field:{onChange,value} }) => 
                  <TextField 
                  onChange={onChange}
                  value={value}
                   />}
                />
              </Box>
            </FormControl>

            <FormControl>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Lessons:
                </Typography>

                <BasicButton
                  type="button"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditLessons}
                >
                  Edit lessons
                </BasicButton>
              </Box>
            </FormControl>

            <Box display="flex" alignItems="center">
              <BasicButton type="submit">Save</BasicButton>
              <BasicButton type="button" onClick={close}>
                Cancel
              </BasicButton>
            </Box>
          </Box>
        
      </BasicModal>
    </>
  );
}

export default EditForm;

{
  /* <FormControl>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Students:
                </Typography>
                <BasicButton type ="button" variant="outlined" startIcon={<EditIcon />} onClick={handleEditLessons}>
                  Edit students
                </BasicButton>
              </Box>
            </FormControl> */
}

//<TextBox id="lessons"  defaultValue="lessons" {...register("Lessons")}/>
//<TextBox id="students" defaultValue="students" {...register("Students")}/>

// <ul>

//         {DUMMY_COURSES.map((todo) => (
//           <li
//             key={todo.id}
//             style={{
//               textDecoration: todo.completed ? "line-through" : "none",
//             }}
//           >
//             {todo.text}{" "}
//             <button >
//               {" "}
//               {todo.completed ? "Mark Incomplete" : "Mark Complete"}{" "}
//             </button>{" "}
//             <button> Delete </button>{" "}
//           </li>
//         ))}
//       </ul>
