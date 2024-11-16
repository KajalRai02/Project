import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";
import { DUMMY_COURSE } from "../../courseDashboard/CourseList";
import { useNavigate, useParams } from "react-router-dom";

function Dashboard({ items, type, apicalls = () => {} }) {
  const navigate = useNavigate();
  const { studentId } = useParams();

  async function handleClick(courseId) {
    if (type === "student") {
      navigate(`/courseView/${courseId}`);
    } else {
        console.log("the student id and course id :", studentId,courseId)
      const response = await apicalls({studentId, courseId});
      if (response) {
        console.log("You are successfully enrolled in this course");
      } else {
        console.log("Enroll failed");
      }
    }
  }

  return (
    <>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}
      >
        {items.map((course) => (
          <Grid2 key={course.id} size={{ xs: 4, sm: 4, md: 3, lg: 3 }}>
            <Card variant="outlined" sx={{ height: 300, width: 300 }}>
              <CardMedia
                component="img"
                src={DUMMY_COURSE.ImageLink}
                sx={{ width: 300, height: 170 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 1,
                }}
              >
                <CardContent component="div">{course.courseName}</CardContent>

                <Button
                  onClick={() => handleClick(course.id)}
                  variant="contained"
                  sx={{ bgcolor: "#167D7F" }}
                >
                  {type === "student" ? "View" : "Enroll Now"}
                </Button>
              </Box>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default Dashboard;
