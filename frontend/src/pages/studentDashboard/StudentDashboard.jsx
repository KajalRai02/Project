import {
  Divider,
  Grid2,
} from "@mui/material";

import {DUMMY_COURSES} from '../../components/CoursesList'
import { CourseCard } from "../../components/CourseCard";

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
          <CourseCard course={course}/>
        </Grid2>
      ))}
    </Grid2>
  </>
  )
}

export default StudentDashboard