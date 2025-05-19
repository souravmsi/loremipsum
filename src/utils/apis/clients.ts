import axiosInstance from "../axiosInstance";
import { handlerApiError } from "../helper";
import { ClientsReponse } from "../types";

export const getClientsByName = async (
    query: string
): Promise<ClientsReponse["payload"]["responseData"]> => {
    try {
        const { data } = await axiosInstance.get<ClientsReponse>(
            `/api/clients/?search=${query}&page=${1}&pageSize=${20}`
        );
        return data.payload.responseData;
    } catch (error) {
        throw handlerApiError(error);
    }
};
