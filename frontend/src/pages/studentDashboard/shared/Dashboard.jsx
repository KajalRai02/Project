import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";
import { DUMMY_COURSE } from "../../courseDashboard/CourseList";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard({ items, type, apicalls = () => {} }) {
  const navigate = useNavigate();
  const { studentId } = useParams();

  async function handleClick(courseId) {
    if (type === "student") {
      navigate(`/courseView/${courseId}`);
    } else {
      
      const response = await apicalls({ studentId, courseId });
      if (response) {
        navigate(`/dashboard/STUDENT/${studentId}`);
        toast.success("You are successfully enrolled in this course");
      } else {
        toast.error("Enroll failed");
      }
    }
  }
  const isEnrolled = (courseId) => {
    const course = items.find((item) => item.id === courseId);
    return course?.studentID?.includes(Number(studentId));
  };

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
                  {type === "student"
                    ? "View"
                    : isEnrolled(course.id)
                    ? "Enrolled"
                    : "Enroll Now"}
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
