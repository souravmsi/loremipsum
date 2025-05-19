import status from "http-status";
import { ApiError } from "./api-error";
import config from "@/config/env";

export async function catchAsync(fn: () => Promise<any>): Promise<{
  success: boolean;
  code: number;
  message: string;
  stack?: string | undefined;
  data?: any | undefined;
}> {
  try {
    const data = await fn();
    return { success: true, code: 201, message: "", stack: "", data };
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return {
        success: false,
        code: error.statusCode,
        message: error.message,
        ...(config.ENVIRONMENT === "development" && {
          stack: error.stack,
        }),
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        code: status.INTERNAL_SERVER_ERROR,
        message: status[`${status.INTERNAL_SERVER_ERROR}_NAME`],
        ...(config.ENVIRONMENT === "development" && {
          stack: error.stack,
        }),
      };
    } else {
      return {
        success: false,
        code: status.INTERNAL_SERVER_ERROR,
        message: status[`${status.INTERNAL_SERVER_ERROR}_NAME`],
        stack: "",
      };
    }
  }
}
