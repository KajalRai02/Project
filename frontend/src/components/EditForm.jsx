import TextBox from "./Forms/TextBox";
import { useForm } from "react-hook-form";
import BasicButton from "./Forms/BasicButton";
import BasicModal from "./Forms/BasicModal";
import { Box, FormControl, Typography } from "@mui/material";
import { useState } from "react";


function EditForm({ open,close ,id, name }) {

  console.log(close)

    const {
        register,
        handleSubmit,
      } = useForm();
    
    function onSubmit() {
      try{
        console.log("Submitting change data")
        //edit form close
        //api call to save to db
       

      }catch{
        console.log("error changing data")

      }
    }
  return (
    <>
      <BasicModal open={open} close={close}>
        <>
          <Box
            component="form"
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
                <TextBox id={name} defaultValue={name} {...register("name")}/>

              </Box>
            </FormControl>

            <FormControl>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Lessons:
                </Typography>
                <TextBox id="lessons"  defaultValue="lessons" {...register("Lessons")}/>
              </Box>
            </FormControl>
            
            <FormControl>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Students:
                </Typography>
                <TextBox id="students" defaultValue="students" {...register("Students")}/>
              </Box>
            </FormControl>

            <Box display="flex" alignItems="center">
              <BasicButton type="submit" onSubmit={handleSubmit}>Save</BasicButton>
              <BasicButton type="button" >Cancel</BasicButton>
            </Box>
          </Box>
        </>
      </BasicModal>
    </>
  );
}

export default EditForm;
