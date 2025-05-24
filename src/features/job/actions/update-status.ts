'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateApplicantStatus(appId: string, status: string, jobId: string) {
  await prisma.jobApplication.update({
    where: { id: appId },
    data: { status },
  });

  // Revalidate job details page
  revalidatePath(`/company/${jobId}`);
}
