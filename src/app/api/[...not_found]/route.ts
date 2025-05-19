import { NextResponse } from "next/server";
import { status } from "http-status";
import config from "@/config/env";

const response = {
  success: false,
  code: status["NOT_FOUND"],
  message: status["404_NAME"],
  ...(config.ENVIRONMENT! === "development" && { environment: "development" }),
};

export async function GET() {
  return NextResponse.json(response, { status: status.NOT_FOUND });
}

export async function POST() {
  return NextResponse.json(response, { status: status.NOT_FOUND });
}

export async function PUT() {
  return NextResponse.json(response, { status: status.NOT_FOUND });
}

export async function DELETE() {
  return NextResponse.json(response, { status: status.NOT_FOUND });
}

export async function PATCH() {
  return NextResponse.json(response, { status: status.NOT_FOUND });
}
