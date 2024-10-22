import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import HomePage from "./pages/Home";
import CourseView from "./pages/courseDashboard/CourseView";

import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import StudentDashboard from "./pages/studentDashboard/StudentDashboard";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/dashboard",
      children: [
        { path: "SUPER_ADMIN", element: <SuperAdminDashboard /> },
        { path: "ADMIN", element: <AdminDashboard /> },
        { path: "STUDENT/:studentId", element: <StudentDashboard /> },
      ],
    },

    { path: "/courseView/:courseId", element: <CourseView /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
