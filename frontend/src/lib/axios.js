import axios from "axios";

// 1. Hardcode the working instance completely to completely ignore cached environment setups
const FINAL_BASE_URL = "https://talent-iq-jlb6.onrender.com/api";

console.log("🚀 FRONTEND AXIOS STRICTLY TARGETING ACTIVE BACKEND:", FINAL_BASE_URL);

const axiosInstance = axios.create({
  baseURL: FINAL_BASE_URL,
  withCredentials: true,
});

export default axiosInstance;