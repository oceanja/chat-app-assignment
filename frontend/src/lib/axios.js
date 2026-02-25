import axios from "axios";

const BASE = import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: `${BASE}/api`,
    withCredentials: true,
});
