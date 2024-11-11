import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isAuthenticated:true,
    courses:[],
    users:[]
}

const dashboardSlice=createSlice({
    name:"dashboard",
    initialState,
    reducers:{
        getAllCourses:(state,action)=>{
            state.courses= action.payload
        },
        getAllLessons:(state,action)=>{
            state.courses= action.payload
        },
        getAllUsers: (state,action)=>{
            state.users= action.payload
        },
        editCourseName: (state, action) => {
            // Find the course with the given courseId
            console.log(action.payload.courseId, "this is courseID");
            console.log(state.courses, 'sare courses')

            const course = state.courses.find(course => course.id === action.payload.courseId);

            console.log(course, "ye course h")
            
            // If the course exists, update the courseName
            if (course) {
                course.courseName = action.payload.courseName;
            console.log(course.courseName, "ye courseName h")
            }
        },
        deleteCourses:(state,action)=>{
            const courseId= action.payload
            state.courses= state.courses.filter(course => course.id !== courseId)
            
        },
        deleteUsers:(state,action)=>{
            const userId= action.payload
            state.users= state.users.filter(user => user.id !== userId)
        },
        getCourseStatus:(state,action)=>{
            const courseStatus= action.payload.active
            const courseId=action.payload.CourseId
            console.log("CourseStatus ; ",courseStatus, courseId)
            state.courses = state.courses.map(course => (
                course.id === courseId ? { ...course, active: courseStatus } : course 
              ));
            console.log(state.courses)
        },
        getUserStatus:(state,action)=>{
            const userStatus= action.payload.active
            const userId=action.payload.userId
            console.log("UserStatus ; ",userStatus, userId)
            state.users = state.users.map(user => (
                user.id === userId ? { ...user, active: userStatus } : user 
              ));
            console.log(state.users)
        }
    }
})

export const {editCourseName,getAllLessons, deleteCourses,getAllCourses,getAllUsers,deleteUsers,getCourseStatus,getUserStatus } =dashboardSlice.actions;
export default dashboardSlice.reducer;