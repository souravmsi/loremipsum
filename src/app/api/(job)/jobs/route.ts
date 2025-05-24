import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { jobService } from "@/services";
import status from "http-status";
import generateResponse from "@/utils/api-response";


export async function GET(req: NextRequest) {
    const result = await catchAsync(async () => {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "10", 10);
      const userId = searchParams.get("userId")!;
  
      return await jobService.getAllJobs({ page, limit, userId });
    });
  
    if (!result.success) {
      return NextResponse.json(result, { status: result.code });
    }
  
    return NextResponse.json(
      generateResponse({
        statusCode: status.OK,
        message: "Jobs fetched successfully",
        success: true,
        data: result.data,
      }),
      { status: status.OK }
    );
  }
  