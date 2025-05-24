import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { jobService } from "@/services";
import generateResponse from "@/utils/api-response";
import status from "http-status";

export async function POST(req: NextRequest) {
  const result = await catchAsync(async () => {
    const data = await req.json();
    return await jobService.applyJob(data);
  });

  if (!result.success) {
    return NextResponse.json(result, { status: result.code });
  }

  return NextResponse.json(
    generateResponse({
      statusCode: status.CREATED,
      message: "Job application submitted successfully",
      success: true,
      data: result.data,
    }),
    { status: status.CREATED }
  );
}
