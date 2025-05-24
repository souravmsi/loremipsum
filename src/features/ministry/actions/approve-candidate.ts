'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveCandidate(applicationId: string, jobId: string) {
  await prisma.jobApplication.update({
    where: { id: applicationId },
    data: {
      ministryApproved: true,
    },
  });

  revalidatePath(`/en`);
  revalidatePath(`/en/${jobId}`);
}
