import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "@/utils/api-error";
import status from "http-status";
import { z } from "zod";
import { loginSchema } from "@/features/auth/schemas";

export const login = async (formData: z.infer<typeof loginSchema>) => {
  const { email, password } = formData;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid credentials");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new ApiError(status.UNAUTHORIZED, "Invalid credentials");
  }
  return user;
};
