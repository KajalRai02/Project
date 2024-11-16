import { useEffect, useState } from "react";
import useAuthService from "../../services/AuthService";
import Header from "../Header";
import { Divider } from "@mui/material";
import Dashboard from "./shared/Dashboard";


function CoursesDashboard() {
  const { getCourses, updateStudent } = useAuthService();

  const [courses, setCourses] = useState([]);

  //const {studentId} = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const allotedCourses = await getCourses();

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
      <Dashboard items={courses} type="course" apicalls={updateStudent}/>
    </>
  );
}

export default CoursesDashboard;
