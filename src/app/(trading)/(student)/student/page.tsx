export const dynamic = "force-dynamic";

import config from "@/config/env";
import JobsListing from "@/features/student/components/jobs-listing";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { headers } from "next/headers";

const getAllJobs = async (page: number, limit: number, userId: string) => {
  const { data } = await axios.get(
    `${config.BASE_URL}/api/jobs?page=${page}&limit=${limit}&userId=${userId}`
  );
  return data;
};

type Props = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const AllJobsPage = async ({ searchParams }: Props) => {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("user-id");
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);


  const skip = (page - 1) * limit;
  
    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          company: true,
        },
        where: {
          status: "OPEN",
        }
      }),
      prisma.job.count(),
    ]);
  
    let appliedJobIds: Set<string> = new Set();
  
    if (userId) {
      const student = await prisma.student.findUnique({
        where: { userId },
      });
  
      if (student) {
        const applications = await prisma.jobApplication.findMany({
          where: {
            studentId: student.id,
            jobId: {
              in: jobs.map((job) => job.id),
            },
          },
          select: {
            jobId: true,
          },
        });
  
        appliedJobIds = new Set(applications.map((a) => a.jobId));
      }
    }
  
    const jobsWithAppliedFlag = jobs.map((job) => ({
      ...job,
      applied: appliedJobIds.has(job.id),
    }));


  return (
    <div className="px-4 py-6 space-y-6 flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-2xl font-semibold">All Job Listings</h1>
        </div>
        <JobsListing jobs ={jobsWithAppliedFlag} page ={page} total = {Math.ceil(total / limit)}/>
      </div>
    </div>
  );
};

export default AllJobsPage;
