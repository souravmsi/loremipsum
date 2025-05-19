import axios from "axios";
import cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "http://qa-gmr.antino.ca",
    timeout: 60000, // Adjust timeout as needed
});

cookies.set("test", "test");

const setupInterceptors = () => {
    // Add a request interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = cookies.get("token");
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
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // Handle common error scenarios
            if (error.response) {
                // Token expiration error (e.g., HTTP 401 Unauthorized)
                if (error.response.status === 401) {
                    // Dispatch the logoutUser action from Redux Toolkit
                    cookies.remove("token");
                }
            }
            return Promise.reject(error);
        }
    );
};

setupInterceptors();

export default axiosInstance;
