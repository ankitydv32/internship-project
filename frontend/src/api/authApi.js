import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth"
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// existing functions
export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);

export default API;