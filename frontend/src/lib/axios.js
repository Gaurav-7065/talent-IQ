import axios from "axios";

// 1. Try to read the environment variable first.
// 2. If it's missing or undefined, explicitly fall back to your live Render API!
const BASE_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : "https://talent-iq-backend-x7rv.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Crucial for Clerk / Cookies across different domains
});

export default axiosInstance;