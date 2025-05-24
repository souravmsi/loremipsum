export const dynamic = "force-dynamic";

import config from "@/config/env";
import { CreateJobModal } from "@/features/job/components/create-job-modal";
import JobsListing from "@/features/job/components/jobs-listing";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { headers } from "next/headers";

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const CompanyPage = async ({ searchParams }: Props) => {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("user-id");

  const { page: currentPage, limit: currentLimit } = await searchParams;

  const page = parseInt(currentPage || "1", 10);
  const limit = parseInt(currentLimit || "10", 10);

  if (!userId) {
    throw new Error("userId is required");
  }

  const existingCompany = await prisma.company.findUnique({
    where: { userId },
  });

  if (!existingCompany) {
    throw new Error("Company not found");
  }

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where: {
        companyId: existingCompany.id,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.job.count({
      where: {
        companyId: existingCompany.id,
      },
    }),
  ]);

  return (
    <div className="px-4 py-6 space-y-6 flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Your Job Openings</h1>
          <CreateJobModal />
        </div>
        <JobsListing jobs={jobs} limit={limit} page={page} total={total} totalPages={Math.ceil(total / limit)} />
      </div>
    </div>
  );
};

export default CompanyPage;
