import Dashboard from "../../components/Dashboard"

import { DUMMY_COURSES } from "../../components/CoursesList"

function AdminDashboard() {
  return (
    <>
      <div>AdminDashboard</div>
      <Dashboard arr={DUMMY_COURSES} flag='admin' />
    </>
  )
}

export default AdminDashboard