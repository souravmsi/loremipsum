import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().min(8, "Minimum 8 characters"),
  })
  .strict();

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    role: z.enum(["STUDENT", "COMPANY", "PHDCC", "MINISTRY"]),
    // Student-specific
    contact: z.string().optional(),
    aadhaarNumber: z.string().optional(),
    college: z.string().optional(),
    graduationLevel: z.string().optional(),
    resume: z.string().url("Resume must be a valid URL").optional(),

    // Company-specific
    location: z.string().optional(),
    about: z.string().optional(),
    website: z.string().url("Must be a valid URL").optional(),
    rolesOffered: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    // Confirm password match
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }

    // Validate STUDENT fields
    if (data.role === "STUDENT") {
      if (!data.contact) {
        ctx.addIssue({
          path: ["contact"],
          code: "custom",
          message: "Contact is required for students",
        });
      }
      if (!data.aadhaarNumber) {
        ctx.addIssue({
          path: ["aadhaarNumber"],
          code: "custom",
          message: "Aadhaar number is required",
        });
      }
      if (!data.college) {
        ctx.addIssue({
          path: ["college"],
          code: "custom",
          message: "College is required",
        });
      }
      if (!data.graduationLevel) {
        ctx.addIssue({
          path: ["graduationLevel"],
          code: "custom",
          message: "Graduation level is required",
        });
      }
      if (!data.resume) {
        ctx.addIssue({
          path: ["resume"],
          code: "custom",
          message: "Resume link is required",
        });
      }
    }

    // Validate COMPANY fields
    if (data.role === "COMPANY") {
      if (!data.contact) {
        ctx.addIssue({
          path: ["contact"],
          code: "custom",
          message: "Contact is required for companies",
        });
      }
      if (!data.location) {
        ctx.addIssue({
          path: ["location"],
          code: "custom",
          message: "Location is required",
        });
      }
      if (!data.about) {
        ctx.addIssue({
          path: ["about"],
          code: "custom",
          message: "About section is required",
        });
      }
      if (!data.website) {
        ctx.addIssue({
          path: ["website"],
          code: "custom",
          message: "Official website link is required",
        });
      }
      if (!data.rolesOffered || data.rolesOffered.length === 0) {
        ctx.addIssue({
          path: ["rolesOffered"],
          code: "custom",
          message: "At least one role must be offered",
        });
      }
    }
  });
