
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

const TextBox = forwardRef(function TextBox(props, ref) {
  const { id, label, defaultValue, ...others } = props;
  return (
    <TextField
      required
      id={id}
      label={label}
      ref={ref}
      defaultValue={defaultValue}
      sx={{ margin: 2 }}
    />
  );
});

export default TextBox;

