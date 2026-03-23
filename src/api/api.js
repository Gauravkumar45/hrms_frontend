import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response);
    return Promise.reject(error);
  }
);

export default API;