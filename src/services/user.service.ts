import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { ApiError } from "@/utils/api-error";
import status from "http-status";
import { z } from "zod";
import { registerSchema } from "@/features/auth/schemas";

export const createUser = async (formData: z.infer<typeof registerSchema>) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    role,
    contact,
    aadhaarNumber,
    college,
    graduationLevel,
    resume,
    location,
    about,
    website,
    rolesOffered,
  } = formData;

  if (password !== confirmPassword) {
    throw new ApiError(status.BAD_REQUEST, "Passwords do not match");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(status.BAD_REQUEST, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 1: Create User
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  // Step 2: Create Student or Company profile
  if (role === "STUDENT") {
    await prisma.student.create({
      data: {
        userId: user.id,
        name: name!,
        contact: contact!,
        aadhaarNumber: aadhaarNumber!,
        college: college!,
        graduationLevel: graduationLevel!,
        resume: resume!,
      },
    });
  }

  if (role === "COMPANY") {
    await prisma.company.create({
      data: {
        userId: user.id,
        name: name!,
        contact: contact!,
        location: location!,
        about: about!,
        website: website!,
        rolesOffered: rolesOffered!, // Should be string[]
      },
    });
  }

  return user;
};
