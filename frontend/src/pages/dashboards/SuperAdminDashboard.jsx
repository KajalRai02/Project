import { useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import useAuthService from '../../services/AuthService';
import Header from "../Header"
import { useSelector } from 'react-redux';

function SuperAdminDashboard() {


  const {getUsers, loading}=useAuthService()
  const userData= useSelector(state => state.dashboard.users)

  useEffect(()=>{

    const fetchUsers = async() =>{
      await getUsers()
      
    }
    fetchUsers();
  

  },[])

  return (
    <>
        <Header />
      <div>SuperAdminDashboard</div>
      
      {userData ? <Dashboard arr={userData} flag='superadmin'/> :  loading}
    </>
  )
}

export default SuperAdminDashboard;