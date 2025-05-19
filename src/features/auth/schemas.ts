import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(8, "Minimum 8 characters"),
  })
  .strict();

export const registerSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(["STUDENT", "COMPANY", "PHDCC", "MINISTRY"]),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
