"use server";

import serverAxios from "./server-action-req";
import { ClientsReponse } from "@/utils/types";

export const getClientsByName = async (
    query: string
): Promise<ClientsReponse["payload"]["responseData"]> => {
    try {
        const { data } = await serverAxios.get<ClientsReponse>(
            `/api/clients/?search=${query}&page=${1}&pageSize=${20}`
        );
        return data.payload.responseData;
    } catch (error) {
        throw error;
    }
};
