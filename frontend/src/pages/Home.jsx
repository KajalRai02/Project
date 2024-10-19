
import { Box, Typography } from "@mui/material"
import Header from "./Header";
import bgImg from "../assets/bgImg.jpg";



function HomePage() {
  return (
    <>
      <Header />

      <Box
        sx={{
          flex:6,
          position:"relative",
          height:"100vh"
        }}
              
      >
        <Box
          sx={{
            position:"absolute",
            top:0,
            left:0,
            width:'100%',
            height:"100%",
            backgroundImage: `url(${bgImg})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            zIndex:1
          }}
        /> 

        <Box 
          sx={{
            position:"absolute",
              top:0,
              left:0,
              width:"100%",
              height:"100%",
              backgroundColor:"rgba(0, 0, 0, 0.5)",
              zIndex:2
          }}
        />


        <Box
          sx={{
            position: "relative",
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            zIndex: 3, 
            color: "#3D52A0", 
            textAlign: "center", 
          }}
        >
          <Typography variant="h3" component="h1">Welcome to SkillShare</Typography>
          <Typography variant="h5" component="p" sx={{mt:2}}>
          Explore a variety of courses and enhance your skills with our expert instructors.
          </Typography>
        </Box>

      </Box>
    
  </>
  )
}

export default HomePage
