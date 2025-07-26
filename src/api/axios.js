import axios from "axios";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
}

const axiosInstance = axios.create({
  baseURL: "https://reactinterviewtask.codetentaclestechnologies.in/api/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        alert("Token expired. Logging out and reloading...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;