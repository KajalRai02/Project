import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
  courses: [],
  users: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    // createUserAdmin:(state,action)=>{
    //   console.log(action.payload)
      

    // },
    createCourses:(state,action)=>{
      console.log(action.payload)
      const newCourse=action.payload
      state.courses.push(newCourse)

    },
    createLessons: (state, action) => {
      const newLesson = action.payload;
      const courseId = newLesson.courseId;
    
      const course = state.courses.find(course => course.id === courseId);
    
      if (course) {
        course.lessons.push(newLesson);
      } else {
        console.error(`Course with id ${courseId} not found`);
      }
    },      
    getAllCourses: (state, action) => {
      state.courses = action.payload;
    },
    getAllLessons: (state, action) => {
      state.courses = action.payload;
    },
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    editCourseName: (state, action) => {
      console.log(action.payload, "poiuytrew");
      console.log(state.courses, "courses");

      const course = state.courses.find(
        (course) => course.id === action.payload.courseId
      );

      console.log(course, "ye course h");

      if (course) {
        course.courseName = action.payload.courseName;
      }
    },
    editLessonName: (state, action) => {
      const { lessonId, lessonName } = action.payload;

      const course = state.courses.find(
        (course) => course.id == action.payload.courseId
      );

      if (course) {
        const lesson = course.lessons.find((lesson) => lesson.id === lessonId);

        if (lesson) {
          lesson.lessonName = lessonName;
        }
      }
    },
    deleteCourses: (state, action) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((course) => course.id !== courseId);
    },
    deleteLesson: (state, action) => {

        const { courseId, lessonId } = action.payload;
        const course = state.courses.find(course => course.id == courseId);
        console.log(course)
        
        if (course) {
            
            course.lessons = course.lessons.filter(lesson => lesson.id !== lessonId);
            console.log(course.lesson)
        }
       
    },
    deleteUsers: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    getCourseStatus: (state, action) => {
      const courseStatus = action.payload.active;
      const courseId = action.payload.CourseId;
      console.log("CourseStatus ; ", courseStatus, courseId);
      state.courses = state.courses.map((course) =>
        course.id === courseId ? { ...course, active: courseStatus } : course
      );
      console.log(state.courses);
    },
    getUserStatus: (state, action) => {
      const userStatus = action.payload.active;
      const userId = action.payload.userId;
      console.log("UserStatus ; ", userStatus, userId);
      state.users = state.users.map((user) =>
        user.id === userId ? { ...user, active: userStatus } : user
      );
      console.log(state.users);
    },
  },
});

export const {
  editCourseName,
  getAllLessons,
  deleteCourses,
  getAllCourses,
  getAllUsers,
  deleteUsers,
  getCourseStatus,
  getUserStatus,
  editLessonName,
  deleteLesson,
  createCourses,
  createLessons,
  // createUserAdmin
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
