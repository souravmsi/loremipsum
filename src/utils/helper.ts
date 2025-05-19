import axios from "axios";
import { ApiError } from "./apis/api-error";
import { Response } from "./types";

interface Block {
    blockNumber: number;
    startTime: string;
    endTime: string;
    price: number;
    volume: number;
}

export const handlerApiError = (error: unknown) => {
    if (axios.isAxiosError<Response>(error)) {
        const throwError = new ApiError(
            error.response?.data?.message || "Something went wrong",
            error.response?.status || 500
        );
        return throwError;
    }
    return new ApiError("An unknown error occurred", 500);
};

export function createBlockBids(
    startIndex: number,
    endIndex: number,
    blocks: Block[],
    volume: number,
    price: number
): Block[] {
    const result: Block[] = [];
    blocks.forEach(({ startTime, endTime, blockNumber }, index) => {
        if (index >= startIndex && index <= endIndex)
            result.push({
                blockNumber,
                startTime,
                endTime,
                volume,
                price,
            });
    });
    return result;
}
