// app/actions/job.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.string().min(1),
});

export async function createJobAction(formData: FormData) {
  const parsed = jobSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    userId: formData.get("userId"),
  });

  if (!parsed.success) {
    throw new Error("Data is not correct");
  }

  const { title, description, userId } = parsed.data;

  const existingCompany = await prisma.company.findUnique({
    where: { userId },
  });

  if (!existingCompany) {
    throw new Error("Company not found");
  }
  const job = await prisma.job.create({
    data: {
      companyId: existingCompany.id,
      title,
      description,
    },
  });
  revalidatePath("/company");
}
