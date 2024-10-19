import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
} from "@mui/material";

import {DUMMY_COURSES} from '../../components/CoursesList'
import { Link} from "react-router-dom";



function StudentDashboard() {
  return (
    <>

    <Divider variant="fullWidth" flexItem />

    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 9, lg: 12 }}
    >
      {DUMMY_COURSES.map((course) => (
        <Grid2 key={course.title} size={{ xs: 4, sm: 4, md: 3, lg: 3 }}>
          {/* course card  */}
          <Card variant="outlined" sx={{ height: 300, width: 300 }}>
            <CardMedia
              component="img"
              src={`${course.image}`}
              sx={{ width: 300, height: 170 }}
            />
            <CardContent component="div">{course.title}</CardContent>

            <CardActionArea
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component={Link}
                to={`/courseView/${1}`}
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
  )
}

export default StudentDashboard