"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateJobApplicationStatus(formData: FormData) {
  try {
    await prisma.jobApplication.update({
      where: { id: formData.get("applicationId") },
      data: { status: formData.get('newStatus') },
    });
    revalidatePath("/company/[companyId]");
  } catch (error) {
    throw error;
  }
}
