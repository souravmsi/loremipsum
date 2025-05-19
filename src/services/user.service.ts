import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "@/utils/api-error";
import status from "http-status";
import { z } from "zod";
import { registerSchema } from "@/features/auth/schemas";

export const createUser = async (formData: z.infer<typeof registerSchema>) => {
  const { name, email, password, confirmPassword, role } = formData;

  if (password !== confirmPassword) {
    throw new ApiError(status.BAD_REQUEST, "Passwords do not match");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(status.BAD_REQUEST, "Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
  return newUser;
};

