import Dashboard from '../../components/Dashboard';
import {DUMMY_USERS} from '../../components/UserList'

function SuperAdminDashboard() {
  return (
    <>
      <div>SuperAdminDashboard</div>
      <Dashboard arr={DUMMY_USERS} flag='superadmin'/>
    </>
  )
}

export default SuperAdminDashboard;