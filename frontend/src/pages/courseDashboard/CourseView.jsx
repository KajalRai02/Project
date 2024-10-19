import { Accordion, AccordionSummary, AccordionDetails, Grid2, Box, Card, CardContent, CardMedia, Typography, CardActions, IconButton, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState } from "react";

import Header from "../Header";

import DUMMY_COURSE from "./CourseList";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          width: "100%",  
          height: "auto",
        },
      },
    },
  },
});

function CourseView() {

    const [activeButton, setActiveButton]= useState(null)

    function handleButtonClick(ButtonType){
        setActiveButton(ButtonType)
    }


  return (
    <>
        <Header />
        <Grid2 container columns={12} columnSpacing={2} >
            <Grid2 size={{xs:12, sm:6}}>
                <Box p={2} >
                    <Card  >
                        
                            <CardMedia
                            component="img"
                            height="auto"
                            width="auto"
                            image={DUMMY_COURSE.ImageLink}
                            alt={DUMMY_COURSE.courseTitle}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {DUMMY_COURSE.courseTitle}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {DUMMY_COURSE.Description}
                                </Typography>
                                
                            </CardContent>
                            <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Box>
                                    <IconButton aria-label="Like" onClick={()=>handleButtonClick("like")} sx={{color: activeButton ==="like" ?"blue" : "inherit"}}>
                                        <ThumbUpIcon  />
                                    </IconButton>

                                    <IconButton aria-label="Dislike" onClick={()=>handleButtonClick("dislike")} sx={{color: activeButton ==="dislike" ?"blue" : "inherit"}}>
                                        <ThumbDownIcon />
                                    </IconButton>
                                </Box>

                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>

                    </Card>
                </Box>

                

            </Grid2>

            <Grid2  size={{xs:12, sm:6}}>

                <Box p={2}>
                    <ThemeProvider theme={theme}>
                    <Accordion sx={{ border: '1px solid #ccc', padding:"8px " , backgroundColor: '#f9f9f9' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {DUMMY_COURSE.courseTitle}
                        </AccordionSummary>
                        {DUMMY_COURSE.lessons.map((lesson)=>(
                            <AccordionDetails key={lesson.lessonId} sx={{ 
                                border: '1px solid #ccc', 
                                borderRadius: '4px',      
                                padding: '16px',          
                                marginBottom: '8px',     
                                backgroundColor: '#f9f9f9' }}
                            >
                            {lesson.lessonTitle}
                        </AccordionDetails>
                        ))}
                        
                        </Accordion>
                    </ThemeProvider>
                </Box>
            </Grid2>
        </Grid2>
      
        
    </>
  );
}

export default CourseView;
