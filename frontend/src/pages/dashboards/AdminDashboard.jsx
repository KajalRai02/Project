import Dashboard from "../../components/Dashboard"
import Header from "../Header"
import useAuthService from "../../services/AuthService"
import { useSelector } from "react-redux"

import { useEffect } from "react"


function AdminDashboard() {

  const {getCourses, loading}=useAuthService()
  const data=useSelector(state=>state.dashboard.courses)
 

  useEffect(()=>{

    const fetchCourses = async() =>{
      await getCourses()
    }
    fetchCourses();
  },[])

 
  return (
    <>
      <Header />
      <div>AdminDashboard</div>
      {data ? <Dashboard arr={data} flag='admin'/> :  loading}
      
    </>
  )
}

export default AdminDashboard