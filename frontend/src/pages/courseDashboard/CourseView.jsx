import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid2,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import Header from "../Header";

import { DUMMY_COURSE } from "./CourseList";
import { useSelector } from "react-redux";
import BasicButton from "../../components/Forms/BasicButton";
import { useParams } from "react-router-dom";
import EditForm from "../../components/EditForm";
import useAuthService from "../../services/AuthService";
import CreateButton from "../../components/Forms/CreateButton";
import CreateForm from "../../components/CreateForm";

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
  const [activeButton, setActiveButton] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false); // state to control modal visibility
  const [editLesson, setEditLesson] = useState(null); // store lesson to edit

  const [showForm, setShowForm] = useState(false);

  const { courseId } = useParams();
  const { updateLesson, deleteLessonById, createLesson } = useAuthService();

  const courses = useSelector((state) => state.dashboard.courses);
  const userRole = useSelector((state) => state.auth.user.role);

  const course = courses.find((course) => course.id === parseInt(courseId));

  function handleClose() {
    setShowForm(false);
  }

  function handleButtonClick(ButtonType) {
    setActiveButton(ButtonType);
  }
  function handleEditLesson(lesson) {
    setEditLesson(lesson); // Set the lesson to be edited
    setOpenEditModal(true); // Open the edit modal
  }
  const handleDeleteLesson = async (lessonId) => {
    await deleteLessonById(lessonId, courseId);

    console.log("Deleted lesson with id:", lessonId);
  };

  return (
    <>
      <Header />

      <Grid2 container columns={12} columnSpacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box p={2}>
            <Card>
              <CardMedia
                component="img"
                height="auto"
                width="auto"
                image={DUMMY_COURSE.ImageLink}
                alt={DUMMY_COURSE.courseTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {DUMMY_COURSE.Description}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box>
                  <IconButton
                    aria-label="Like"
                    onClick={() => handleButtonClick("like")}
                    sx={{ color: activeButton === "like" ? "blue" : "inherit" }}
                  >
                    <ThumbUpIcon />
                  </IconButton>

                  <IconButton
                    aria-label="Dislike"
                    onClick={() => handleButtonClick("dislike")}
                    sx={{
                      color: activeButton === "dislike" ? "blue" : "inherit",
                    }}
                  >
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

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box p={2}>
            <ThemeProvider theme={theme}>
              <Accordion
                sx={{
                  border: "1px solid #ccc",
                  padding: "8px ",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {course.courseName}
                </AccordionSummary>
                {course.lessons.map((lesson) => (
                  <AccordionDetails
                    key={lesson.id}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "16px",
                      marginBottom: "8px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {lesson.lessonName}

                    {userRole === "ADMIN" && (
                      <>
                        <BasicButton
                          variant="outlined"
                          startIcon={<EditIcon />}
                          sx={{ margin: 1 }}
                          onClick={() => handleEditLesson(lesson)}
                        ></BasicButton>
                        <BasicButton
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteLesson(lesson.id)}
                        ></BasicButton>
                      </>
                    )}
                  </AccordionDetails>
                ))}
              </Accordion>
            </ThemeProvider>
          </Box>
        </Grid2>
      </Grid2>

      <CreateButton onClick={() => setShowForm(true)} />

      {showForm && userRole === "ADMIN" && (
        <CreateForm
          name="lessonName"
          label="Lesson Name"
          open={showForm}
          close={handleClose}
          apiCalls={createLesson}
          courseId={courseId}
        />
      )}

      {editLesson && (
        <EditForm
          open={openEditModal}
          close={() => setOpenEditModal(false)} // Close the modal
          id={editLesson.id}
          name={editLesson.lessonName} // Pass the lesson name for editing
          type="lesson"
          apiCalls={updateLesson}
          courseId={courseId}
        />
      )}
    </>
  );
}

export default CourseView;
