import axios from "axios";
import { useEffect, useState } from "react";

const useAxios = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });


  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );


    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        const newToken = response.headers["authorization"];
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          setToken(newToken);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response?.status === 403 &&
          error.response.data?.message === "Invalid Access Token"
        ) {
          try {
            const refreshResponse = await fetchData({
              url: "/api/auth/refresh-Token",
              method: "POST",
            });

            const newAccessToken = refreshResponse.headers["authorization"];
            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              setToken(newAccessToken);

              // Retry the original request with the new token
              originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);

            } else {
              clearAuth();
            }
          } catch  {
            clearAuth(); 
          }
        }

        return Promise.reject(error);
      }
    );
    
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  const clearAuth = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    // Additional logout logic, if needed
  };

  const fetchData = async ({ url, method, data = {}, params = {} }) => {
    setLoading(true);
    setError("");

    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
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
