import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-8tpe.onrender.com",
  headers: {

    "Content-Type": "application/json",
  },
  withCredentials: true,
});






export default axiosInstance;