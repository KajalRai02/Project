import { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import useAuthService from "../../services/AuthService";
import Header from "../Header";
import { useSelector } from "react-redux";
import CreateButton from "../../components/Forms/CreateButton";
import { useNavigate } from "react-router-dom";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  const { getUsers, loading } = useAuthService();
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
      <div>SuperAdminDashboard</div>

      {userData ? <Dashboard arr={userData} flag="superadmin" /> : loading}
      <CreateButton onClick={handleClick} />
    </>
  );
}

export default SuperAdminDashboard;
