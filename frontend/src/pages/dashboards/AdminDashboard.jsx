import Dashboard from "../../components/Dashboard";
import Header from "../Header";
import useAuthService from "../../services/AuthService";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import CreateForm from "../../components/CreateForm";
import CreateButton from "../../components/Forms/CreateButton";
import { useParams } from "react-router-dom";

function AdminDashboard() {
  const { getAdminCourses, loading, createCourse } = useAuthService();
  const data = useSelector((state) => state.dashboard.courses);

  const {adminId}=useParams();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      //await getCourses();
      
      await getAdminCourses(adminId);
    };
    fetchCourses();
  }, []);

  function handleClose() {
    setShowForm(false);
  }

  return (
    <>
      <Header />
      <div>AdminDashboard</div>
      {data ? <Dashboard arr={data} flag="admin" /> : loading}

      <CreateButton onClick={() => setShowForm(true)} />

      {showForm && (
        <CreateForm
          name="courseName"
          label="Course Name"
          open={showForm}
          close={handleClose}
          apiCalls={createCourse}
        />
      )}
    </>
  );
}

export default AdminDashboard;
