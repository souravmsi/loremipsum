import axiosInstance from "../axiosInstance";
import { Response } from "../types";
import { handlerApiError } from "../helper";

interface LoginResponse extends Response {
    payload: {
        user: {
            id: string;
            email: string;
            role: string;
        };
        token: string;
    };
}

export const login = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    try {
        const {data} = await axiosInstance.post<LoginResponse>(
            "/api/admin/login",
            {
                email,
                password,
            }
        );
        return data;
    } catch (error) {
        throw handlerApiError(error);
    }
};
