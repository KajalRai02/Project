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
        getAllUsers: (state,action)=>{
            state.users= action.payload
        },
        edit:(state,action)=>{

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
        }
    }
})

export const {edit, deleteCourses,getAllCourses,getAllUsers,deleteUsers,getCourseStatus } =dashboardSlice.actions;
export default dashboardSlice.reducer;