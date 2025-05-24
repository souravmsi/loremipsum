import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { jobService } from "@/services";
import status from "http-status";
import generateResponse from "@/utils/api-response";

export async function POST(req: NextRequest) {
  const result = await catchAsync(async () => {
    const data = await req.json();
    // validate(registerSchema, data);
    return await jobService.createJob(data);
  });
  if (!result.success) {
    return NextResponse.json(result, { status: result.code });
  } else {
    return NextResponse.json(
      generateResponse({
        statusCode: status.CREATED,
        message: "user created",
        success: true,
      }),
      { status: status.CREATED }
    );
  }
}

// GET - Get Paginated Jobs by Company
export async function GET(req: NextRequest) {
  const result = await catchAsync(async () => {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!userId) {
      throw new Error("userId is required");
    }

    return await jobService.getJobs({ userId, page, limit });
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
