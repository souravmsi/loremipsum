import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { userService } from "@/services";
import status from "http-status";
import generateResponse from "@/utils/api-response";
import validate from "@/utils/validate";
import { registerSchema } from "@/features/auth/schemas";

export async function POST(req: NextRequest) {
  const result = await catchAsync(async () => {
    const data = await req.json();
    validate(registerSchema, data);
    return await userService.createUser(data);
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
