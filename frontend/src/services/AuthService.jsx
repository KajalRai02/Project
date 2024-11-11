import useAxios from "../components/useAxios";
import { useDispatch } from "react-redux";
import {
  getAllCourses,
  getAllLessons,
  getAllUsers,
  deleteCourses,
  deleteUsers,
  getCourseStatus,
  getUserStatus,
  editCourseName,
} from "../store/dashboardSlice";

const useAuthService = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const { loading, error, fetchData } = useAxios();

  const loginAuth = async (data) => {
    try {
      const response = (
        await fetchData({
          url: "/api/auth/login",
          method: "POST",
          data: {
            userName: data.Username,
            password: data.Password,
          },
        })
      ).data;
      return response;
    } catch (error) {
      console.log("Problem logging in .", error);
      return;
    }
  };

  const registerAuth = async (data) => {
    try {
      const response = await fetchData({
        url: "/api/student/register",
        method: "POST",
        data: {
          userName: data.Username,
          password: data.Password,
          email: data.Email,
        },
      });
      return response;
    } catch (error) {
      console.log("Problem while registering .", error);
      return;
    }
  };

  const logoutAuth = async () => {
    console.log(accessToken);

    //remove data from token table and remove refresh token from backend
    await fetchData({
      url: "/api/auth/logout",
      method: "POST",
      headers: { Authorization: accessToken },
    });

    //remove local storage
    localStorage.removeItem("accessToken");
  };

  const getCourses = async () => {
    try {
      const response = (
        await fetchData({
          url: "/api/courses",
          method: "GET",
          headers: { Authorization: accessToken },
        })
      ).data;

      dispatch(getAllCourses(response));

      return response;
    } catch {
      console.log("Error while retrieving courses");
    }
  };

  const getLessons = async () => {
    try {
      const response = (
        await fetchData({
          url: "/api/lessons",
          method: "GET",
          headers: { Authorization: accessToken },
        })
      ).data;

      dispatch(getAllLessons(response));

      return response;
    } catch {
      console.log("Error while retrieving courses");
    }
  };

  const getUsers = async () => {
    try {
      const response = (
        await fetchData({
          url: "/superAdmins/users",
          method: "GET",
          headers: { Authorization: accessToken },
        })
      ).data;
      console.log(response);
      dispatch(getAllUsers(response));

      return response;
    } catch {
      console.log("Error while retrieving users");
    }
  };

  const deleteCourseById = async (CourseId) => {
    try {
      await fetchData({
        url: `/api/courses/${CourseId}`,
        method: "DELETE",
        headers: { Authorization: accessToken },
      });

      dispatch(deleteCourses(CourseId));
      console.log("deleted");
    } catch {
      console.log("Error deleting courses by Id");
    }
  };

  const deleteUserById = async (userId) => {
    try {
      await fetchData({
        url: `/superAdmins/users/${userId}`,
        method: "DELETE",
        headers: { Authorization: accessToken },
      });

      dispatch(deleteUsers(userId));
    } catch {
      console.log("Error deleting users by Id");
    }
  };

  const updateCourseStatus = async (CourseId, status, activeId) => {
    try {
      console.log("Active Id that we are sending:", activeId);
      console.log("Request body: ", JSON.stringify({ activeId }));

      await fetchData({
        url: `/api/courses/update/status/${CourseId}`,
        method: "PUT",
        data: { activeId },
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      dispatch(getCourseStatus({ CourseId, active: !status }));
    } catch {
      console.log("Error updating course status");
    }
  };

  const updateUserStatus = async (userId, status, activeId) => {
    try {
      console.log("Active Id that we are sending:", activeId);
      console.log("Request body: ", JSON.stringify({ activeId }));

      await fetchData({
        url: `/superAdmins/users/${userId}`,
        method: "PUT",
        data: { activeId },
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      dispatch(getUserStatus({ userId, active: !status }));
    } catch {
      console.log("Error updating user status");
    }
  };

  const updateCourse = async (courseId, courseName) => {
    try {
      console.log("Course id , whose name i want to update", courseId);
      await fetchData({
        url: `/api/courses/${courseId}`,
        method: "PUT",
        data: { courseName },
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      dispatch(editCourseName({courseId, courseName}))
    } catch {
      console.log("Error updating course Name");
    }
  };

  return {
    error,
    loading,
    loginAuth,
    registerAuth,
    logoutAuth,
    getCourses,
    getUsers,
    deleteCourseById,
    updateCourseStatus,
    updateUserStatus,
    deleteUserById,
    getLessons,
    updateCourse,
  };
};

export default useAuthService;
