"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import config from "@/config/env";

const JWT_SECRET = config.JWT.JWT_SECRET || "";

export async function approveByPHDCC(applicationId: string, approve: boolean) {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    // Verify token and extract payload
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    // Extract user ID from payload (adjust property name if needed)
    const userId = payload.sub || payload.userId || payload.id;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid token payload: no user ID");
    }

    // Fetch user from DB by id to get the role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "PHDCC") {
      throw new Error("Forbidden: User role is not PHDCCI");
    }

    // Update job application approval status
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { phdccApproved: approve },
    });

  } catch (error) {
    throw new Error("Unauthorized or Invalid token");
  }
}
