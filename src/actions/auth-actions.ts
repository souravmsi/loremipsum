"use server";
import { login } from "@/utils/apis/auth";
import { cookies } from "next/headers";

async function createCookie(token: string) {
    const expireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: true,
        expires: expireAt,
    });
}

export const loginAction = async (creds: {
    email: string;
    password: string;
}) => {
    try {
        const response = await login(creds);

        await createCookie(response.payload.token);

        return { success: true, message: "Login successful" };
    } catch (error) {
        throw error;
    }
};

export const logoutAction = async () => {
    try {
        (await cookies()).delete("token");
        return { success: true };
    } catch (error) {
        throw error;
    }
};
