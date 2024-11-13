import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
} from "@mui/material";

import { DUMMY_COURSE } from "../courseDashboard/CourseList";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import useAuthService from "../../services/AuthService";

function StudentDashboard() {
  const { getAllocatedCourses } = useAuthService();

  const {studentId} = useParams();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allotedCourses = await getAllocatedCourses(studentId);

      const filteredCourses = allotedCourses.map((course) => ({
        courseName: course.courseName,
        id: course.id,
      }));

      setCourses(filteredCourses);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <Divider variant="fullWidth" flexItem />

      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}
      >
        {courses.map((course) => (
          <Grid2 key={course.id} size={{ xs: 4, sm: 4, md: 3, lg: 3 }}>
            <Card variant="outlined" sx={{ height: 300, width: 300 }}>
              <CardMedia
                component="img"
                src={DUMMY_COURSE.ImageLink}
                sx={{ width: 300, height: 170 }}
              />
              <CardContent component="div">{course.courseName}</CardContent>

              <CardActionArea
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  component={Link}
                  to={`/courseView/${course.id}`}
                  variant="contained"
                  sx={{ bgcolor: "#167D7F" }}
                >
                  VIEW
                </Button>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default StudentDashboard;
