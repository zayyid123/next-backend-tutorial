import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});