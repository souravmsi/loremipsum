import status from "http-status";
import generateResponse from "@/utils/api-response";
import validate from "@/utils/validate";
import { NextRequest, NextResponse } from "next/server";
import { catchAsync } from "@/utils/catchAsync";
import { authService } from "@/services";
import { loginSchema } from "@/features/auth/schemas";
import { generateAuthToken } from "@/services/token.service";

export async function POST(req: NextRequest) {
  const result = await catchAsync(async () => {
    const data = await req.json();
    validate(loginSchema, data);
    const user = await authService.login(data);
    const token = await generateAuthToken(user.id, user.role);
    const { password, ...sanitizedUser } = user;
    return {
      user: sanitizedUser,
      token,
    };
  });
  if (!result.success) {
    return NextResponse.json(result, { status: result.code });
  } else {
    const response = NextResponse.json(
      generateResponse({
        statusCode: status.OK,
        message: "Logged in successfully",
        success: true,
        data: { user: result.data.user },
      }),
      { status: status.OK }
    );

    response.cookies.set("token", result.data.token, {
      httpOnly: true,
      secure: true,
      maxAge: 120 * 60,
    });

    return response;
  }
}
