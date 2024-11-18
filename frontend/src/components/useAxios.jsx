import axios from "axios";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { resetDashboard } from "../store/dashboardSlice";
import { toast } from "react-toastify";



const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [error, setError] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });


  axiosInstance.interceptors.request.use(
    (config) => {
      dispatch(setLoading(true));
      return config;
    },
    (error) => {
      console.log("Encountered error while sending request");
      dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      dispatch(setLoading(false));
      const newToken = response.headers["authorization"];
      if (newToken) {
        localStorage.setItem("accessToken", newToken);
      }
      return response;
    },
    async (error) => {
      dispatch(setLoading(false));
      toast.error("Some problem occured")
      console.log("Error printed inside response interceptors =", error);
      if (
        error.response && error.response.status === 401 && error.response.data?.message === "Invalid Token"
      ) {
   
        toast.info("You need to login again")
        
        localStorage.removeItem("accessToken");
        dispatch(logout())
        dispatch(resetDashboard())
        navigate('/login')
        
        
      }

      return Promise.reject(error);
    }
  );

  const fetchData = async ({
    url,
    method,
    data = {},
    params = {},
    headers = {},
  }) => {
    setLoading(true);
    setError("");

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return result;
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { error, fetchData };
};

export default useAxios;



