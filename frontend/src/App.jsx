import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import HomePage from "./pages/Home";
import CourseView from "./pages/courseDashboard/CourseView";

import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import StudentDashboard from "./pages/studentDashboard/StudentDashboard";
import RequiredAuth from "./components/RequiredAuth";
import Unauthorized from "./components/Unauthorized";
import NotFoundPage from "./components/Forms/NotFoundPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/unauthorized", element: <Unauthorized /> },

    {
      path: "/dashboard",
      element: <RequiredAuth allowedRoles={["SUPER_ADMIN"]} />,
      children: [{ path: "SUPER_ADMIN", element: <SuperAdminDashboard /> }],
    },

    {
      path: "/dashboard",
      element: <RequiredAuth allowedRoles={["ADMIN"]} />,
      children: [{ path: "ADMIN/:adminId", element: <AdminDashboard /> }],
    },

    {
      path: "/dashboard",
      element: <RequiredAuth allowedRoles={["STUDENT"]} />,
      children: [{ path: "STUDENT/:studentId", element: <StudentDashboard /> }],
    },

    {
      path: "/",
      element: <RequiredAuth allowedRoles={["STUDENT", "ADMIN"]} />,
      children: [{ path: "courseView/:courseId", element: <CourseView /> }],
    },
    

    { path: "*", element: <NotFoundPage /> },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
