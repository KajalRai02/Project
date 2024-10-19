/* eslint-disable react/prop-types */

import { Box } from "@mui/material";
import Header from "../pages/Header";

const PageLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: "#ADBBDA",
          minHeight: "100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          marginTop:0
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default PageLayout;
