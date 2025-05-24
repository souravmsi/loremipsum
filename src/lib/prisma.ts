import config from "@/config/env";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (config.ENVIRONMENT !== "production") globalForPrisma.prisma = prisma;
