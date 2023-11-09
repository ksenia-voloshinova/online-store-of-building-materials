import axios from "axios";

import authService from "@/services/authService";
import { BASE_DOMAIN } from "@/utils/constants";

const baseURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_API_URL  : BASE_DOMAIN;

export const serverInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1`,
    withCredentials: true,
    headers: {
        Host: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    }
});

export const instance = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
});

instance.interceptors.response.use((config) => {
    return config;
},async (err) => {
    const originalRequest = err.config;

    if (err.response) {
        if (err.response.status === 401 && originalRequest && !originalRequest._isRetry) {

            originalRequest._isRetry = true;

            try {
                const { data } = await authService.refresh();

                return instance.request(originalRequest);
            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(err);
    }
});
