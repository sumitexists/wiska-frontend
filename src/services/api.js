import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Change this once when you deploy!
  timeout: 10000, // Abort the request if it takes longer than 10 seconds
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export default api;
