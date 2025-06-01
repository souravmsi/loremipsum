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


// Already existing action (assumed):
export async function updateJobStatus(formData: FormData) {
  const id = formData.get("applicationId") as string;
  const newStatus = formData.get("newStatus") as string;

  await prisma.jobApplication.update({
    where: { id },
    data: { status: newStatus },
  });

  // Optionally revalidate if you're showing this status elsewhere
  revalidatePath("/");
}



export async function toggleJobStatus(jobId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { status: true },
  });

  if (!job) throw new Error("Job not found");

  const newStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";

  await prisma.job.update({
    where: { id: jobId },
    data: { status: newStatus },
  });

  revalidatePath(`/company/${jobId}`); // change path as per routing
}