import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// ARTWORKS
export const getArtworks = () => API.get("/artworks");
export const addArtwork = (data) => API.post("/artworks", data);
export const deleteArtwork = (id) => API.delete(`/artworks/${id}`);

export default API;