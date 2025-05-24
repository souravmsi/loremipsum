import { prisma } from "@/lib/prisma";
import { ApiError } from "@/utils/api-error";
import status from "http-status";

type CreateJobInput = {
  userId: string; // MongoDB ObjectId string
  title: string;
  description: string;
};

type GetJobsInput = {
  userId: string;
  page?: number;
  limit?: number;
};

export const createJob = async ({
  userId,
  title,
  description,
}: CreateJobInput) => {
  // Check if company exists
  const existingCompany = await prisma.company.findUnique({
    where: { userId },
  });

  if (!existingCompany) {
    throw new ApiError(status.NOT_FOUND, "Company not found");
  }

  // Create the job
  const job = await prisma.job.create({
    data: {
      companyId: existingCompany.id,
      title,
      description,
    },
  });

  return job;
};

export const getJobs = async ({
  userId,
  page = 1,
  limit = 10,
}: GetJobsInput) => {
  const existingCompany = await prisma.company.findUnique({
    where: { userId },
  });

  if (!existingCompany) {
    throw new ApiError(status.NOT_FOUND, "Company not found");
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

  return {
    jobs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

type GetAllJobsInput = {
  userId?: string; // student userId (optional, required to check 'applied')
  page?: number;
  limit?: number;
};

export const getAllJobs = async ({
  userId,
  page = 1,
  limit = 10,
}: GetAllJobsInput) => {
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

  return {
    jobs: jobsWithAppliedFlag,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};























type ApplyJobInput = {
  userId: string;
  jobId: string;
};

export const applyJob = async ({ userId, jobId }: ApplyJobInput) => {
  if (!userId || !jobId) {
    throw new ApiError(status.BAD_REQUEST, "userId and jobId are required");
  }

  const student = await prisma.student.findUnique({
    where: { userId },
  });

  if (!student) {
    throw new ApiError(status.NOT_FOUND, "Student not found");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new ApiError(status.NOT_FOUND, "Job not found");
  }

  const alreadyApplied = await prisma.jobApplication.findFirst({
    where: {
      studentId: student.id,
      jobId,
    },
  });

  if (alreadyApplied) {
    throw new ApiError(status.BAD_REQUEST, "Already applied to this job");
  }

  const application = await prisma.jobApplication.create({
    data: {
      studentId: student.id,
      jobId,
    },
  });

  return application;
};

export const jobService = {
  createJob,
  getJobs,
  getAllJobs,
  applyJob,
};
