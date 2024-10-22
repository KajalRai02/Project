
import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    isAuthenticated:false,
    user:{}
}

const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state, action)=>{
            state.isAuthenticated=true
            state.user = action.payload
        },
        logout:(state)=>{
            state.isAuthenticated=false
            state.user = null
        }
    }
})

export const {login,logout}= userSlice.actions
export default userSlice.reducer