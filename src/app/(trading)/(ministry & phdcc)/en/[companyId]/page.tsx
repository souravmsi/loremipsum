import { prisma } from "@/lib/prisma";
import JobList from "@/features/ministry/components/job-list";

interface Props {
  params: { companyId: string };
  searchParams?: { page?: string; limit?: string; search?: string };
}

export default async function CompanyJobs({
  params,
  searchParams,
}: Props) {
  const page = parseInt(searchParams?.page ?? "1", 10);
  const limit = parseInt(searchParams?.limit ?? "5", 10);
  const search = searchParams?.search ?? "";

  const where = search
    ? { companyId: params.companyId, title: { contains: search, mode: "insensitive" } }
    : { companyId: params.companyId };

  const totalJobs = await prisma.job.count({ where });

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return (
    <div className="px-4 py-6 space-y-6 flex justify-center">
      <div className="w-full">
        <h1 className="text-xl font-semibold mb-6">Jobs Posted</h1>
        <JobList
          jobs={jobs}
          companyId={params.companyId}
          page={page}
          limit={limit}
          total={totalJobs}
          search={search}
        />
      </div>
    </div>
  );
}
