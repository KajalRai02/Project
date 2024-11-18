import {
  Divider,
} from "@mui/material";


import { useParams } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import useAuthService from "../../services/AuthService";
import Dashboard from "./shared/Dashboard";

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
      <Header studentId={studentId} type="student"/>
      <h1>Student Dashboard</h1>
      <Divider variant="fullWidth" flexItem />
      <Dashboard items={courses} type="student" />
    </>
  );
}

export default StudentDashboard;
