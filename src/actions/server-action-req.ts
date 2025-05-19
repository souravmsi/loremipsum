"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const serverAxios = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 60000, // Adjust timeout as needed
});

const setupInterceptors = () => {
    serverAxios.interceptors.request.use(
        async (config) => {
            const token = (await cookies()).get("token")?.value;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    serverAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            // Handle common error scenarios
            if (error.response) {
                // Token expiration error (e.g., HTTP 401 Unauthorized)
                if (error.response.status === 401) {
                    (await cookies()).delete("token");
                    redirect("/login");
                }
            }
            return Promise.reject(error);
        }
    );
};

setupInterceptors();

export default serverAxios;
