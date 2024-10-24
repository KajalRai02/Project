  import { configureStore } from '@reduxjs/toolkit'
  import userReducer from "./userSlice"
  import dashboardReducer from './dashboardSlice'

  export const store = configureStore({
    reducer: {
      auth:userReducer,
      dashboard:dashboardReducer
    },
  })