import { useForm, Controller } from "react-hook-form";
import { TextField, Box} from "@mui/material";
import BasicButton from "./Forms/BasicButton";
import BasicModal from "./Forms/BasicModal";

const CreateForm = ({name, label, open, close, apiCalls, courseId}) => {

  const { handleSubmit, control } = useForm();

  const onSubmit = async(data) => {
    console.log(data," ", courseId);
    //backend api call to create course , lesson or user
    await apiCalls({name:data[name], courseId})
    close()

  };
  return (
    <BasicModal open={open} close={close}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              variant="outlined"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <BasicButton
            type="submit"
            color="primary"
            sx={{ marginTop: 2, padding: 2 }}
            onClick={() => console.log("Create button clicked")}
        >
            Create
        </BasicButton>

        <BasicButton
            type="button"
            color="primary"
            sx={{ marginTop: 2, padding: 2 }}
            onClick={close}
        >
            Cancel
        </BasicButton>
        </Box>
      </form>
    </BasicModal>
  );
};

export default CreateForm;
