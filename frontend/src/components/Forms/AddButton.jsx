import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddButton() {
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<AddCircleIcon />}
        sx={{ bgcolor: "mint", color: "teal", borderBlockColor: "teal" }}
      >
        Add
      </Button>
    </>
  );
}

export default AddButton;
