import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = () => {  
    
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(''); 
  
  const axiosInstance = axios.create({    baseURL: "http://localhost:8080",
    withCredentials: true,
  }); 
   axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );  
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response1) => {
        localStorage.setItem("accessToken", response1.headers["authorization"]);
        return response1;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.message === "Invalid Access Token"
        ) {
          const refreshResponse = await fetchData({
            url: "/api/auth/refresh-Token",
            method: "POST",
          });
          //if refresh token is invalid, take it to logout page and clear localStorage and cookies
          //else
          const newAccessToken = refreshResponse.headers["authorization"];
          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            setToken(newAccessToken);
            originalRequest.headers[
              "authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }, [token]); 
  
  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
       //setResponse(result)     
       return result;
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, fetchData };
};
export default useAxios;



