import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Table from "./data-table";

interface SearchParams {
  page?: string;
  limit?: string;
  title?: string;
}

export default async function AppliedJobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const requestHeaders = headers();
  const userId = requestHeaders.get("user-id");
  if (!userId) return notFound();

  const page = parseInt(searchParams.page || "1", 10);
  const limit = 10
  const titleFilter = searchParams.title?.trim() || "";

  const student = await prisma.student.findUnique({
    where: { userId },
    select: {
      appliedJobs: {
        where: titleFilter
          ? {
              job: {
                title: { contains: titleFilter, mode: "insensitive" },
              },
            }
          : {},
        include: {
          job: { include: { company: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      },
      _count: {
        select: {
          appliedJobs: titleFilter
            ? {
                where: {
                  job: {
                    title: { contains: titleFilter, mode: "insensitive" },
                  },
                },
              }
            : true,
        },
      },
    },
  });

  if (!student) return notFound();

  const total = student._count.appliedJobs as number;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      <Table jobs={student} totalPages={totalPages} page={page}/>
    </div>
  );
}
