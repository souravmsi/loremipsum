import { ZodSchema } from "zod";
import { ApiError } from "./api-error";

const validate = <T>(schema: ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues
      .map(({ message, path }) => `${path.join(".")}: ${message}`)
      .join(", ");
    throw new ApiError(400, errors);
  }
};

export default validate;
