import { z } from "zod";

const envVarSchema = z.object({
  DATABASE_URL: z.string(),
  ENVIRONMENT: z.enum(["development", "production", "staging"]),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string().transform((data) => {
    const minutes = Number(data);
    if (isNaN(minutes)) {
      throw new Error("JWT_ACCESS_EXPIRATION_MINUTES should be a valid number");
    }
    return minutes;
  }),
});

const { success, data: envVars, error } = envVarSchema.safeParse(process.env);

if (!success) {
  console.error(
    "❌ Invalid environment variables:",
    error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

const config = {
  DATABASE_URL: envVars?.DATABASE_URL,
  ENVIRONMENT: envVars?.ENVIRONMENT,
  JWT: {
    JWT_SECRET: envVars?.JWT_SECRET,
    JWT_ACCESS_EXPIRATION_MINUTES: envVars?.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};

export default config;
