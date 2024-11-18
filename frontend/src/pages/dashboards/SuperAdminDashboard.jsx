import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import useAuthService from "../../services/AuthService";
import Header from "../Header";
import { useSelector } from "react-redux";
import CreateButton from "../../components/Forms/CreateButton";
import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  const { getUsers } = useAuthService();
  const userData = useSelector((state) => state.dashboard.users);

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };
    fetchUsers();
  }, []);

  function handleClick() {
    navigate("/register");
  }

  return (
    <>
      <Header />
      <h1>SuperAdmin Dashboard</h1>

      {userData && <Dashboard arr={userData} flag="superadmin" /> }
      <CreateButton onClick={handleClick} />
    </>
  );
}

export default SuperAdminDashboard;
