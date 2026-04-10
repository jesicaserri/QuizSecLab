import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("quiz_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("quiz_token");
      localStorage.removeItem("quiz_user");
    }
    return Promise.reject(err);
  }
);

export default API;
