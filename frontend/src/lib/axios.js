import axios from "axios";

// Change this line to point to the active backend instance (-jlb6)
let envUrl = import.meta.env.VITE_API_URL || "https://talent-iq-jlb6.onrender.com/api";

if (envUrl.endsWith("/")) {
  envUrl = envUrl.slice(0, -1);
}

const FINAL_BASE_URL = envUrl.endsWith("/api") ? envUrl : `${envUrl}/api`;

const axiosInstance = axios.create({
  baseURL: FINAL_BASE_URL,
  withCredentials: true, // This passes your Clerk auth keys
});

export default axiosInstance;