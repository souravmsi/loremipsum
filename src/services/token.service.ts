import config from "@/config/env";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

enum tokenTypes {
  ACCESS = "access",
  REFRESH = "refresh",
}

const generateToken = async (
  userId: string,
  expires: dayjs.Dayjs,
  type: tokenTypes,
  role: "COMPANY" | "STUDENT" | "MINISTRY" | "PHDCC",
  secret = config.JWT.JWT_SECRET
) => {
  const payload = {
    role,
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const generateAuthToken = async (userId: string, role: "COMPANY" | "STUDENT" | "MINISTRY" | "PHDCC") => {
  const accessTokenExpires = dayjs().add(
    config.JWT.JWT_ACCESS_EXPIRATION_MINUTES,
    "minutes"
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS,
    role
  );
  return accessToken;
};
