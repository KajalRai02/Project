/* eslint-disable react/prop-types */

import { Box, TextField, Button, FormControl, FormHelperText, Typography, Paper } from "@mui/material";

const RegisterForm = ({ onSubmit, register, errors, isSubmitting }) => {
  return (
    <Paper elevation={24} sx={{ padding: 4, width: '80%', mt: "100px", maxWidth: 400, backgroundColor: "#8697C4" }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Register</Typography>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <FormControl>
          <TextField
            id="outlined-required"
            label="Username"
            {...register("Username", {
              required: "Username is required",
              maxLength: 20,
            })}
          />
          <FormHelperText>{errors.Username?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <TextField
            id="outlined-email"
            label="Email"
            type="email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid"
              }
            })}
          />
          <FormHelperText>{errors.Email?.message}</FormHelperText>
        </FormControl>

        <FormControl>
          <TextField
            type="password"
            id="outlined-required"
            label="Password"
            {...register("Password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              maxLength: { value: 20, message: "Password cannot exceed 20 characters" },
            })}
          />
          <FormHelperText>{errors.Password?.message}</FormHelperText>
        </FormControl>

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Sign up
        </Button>
      </Box>
    </Paper>
  );
};

export default RegisterForm;
