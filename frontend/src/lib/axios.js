import axios from "axios";

// 1. Get the base string from your environment, or fallback to localhost
let envUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// 2. Clear any accidental trailing slashes
if (envUrl.endsWith("/")) {
  envUrl = envUrl.slice(0, -1);
}

// 3. FORCE append /api if it's missing from the string
const FINAL_BASE_URL = envUrl.endsWith("/api") ? envUrl : `${envUrl}/api`;

console.log("🚀 Network requests are pointing to:", FINAL_BASE_URL);

const axiosInstance = axios.create({
  baseURL: FINAL_BASE_URL,
  withCredentials: true, // Crucial for cross-origin cookies/Clerk mechanics
});

export default axiosInstance;