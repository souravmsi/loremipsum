import { prisma } from "@/lib/prisma";
import CompanyList from "@/features/ministry/components/company-list";
import { notFound } from "next/navigation";

interface SearchParams {
  search?: string;
  page?: string;
  limit?: string;
}

export default async function MinistryDashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = parseInt(searchParams.limit || "10", 10);
  const search = searchParams.search?.toLowerCase() || "";

  const [companies, total] = await prisma.$transaction([
    prisma.company.findMany({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        name: true,
        location: true,
        contact: true,
      },
    }),
    prisma.company.count({
      where: {
        name: { contains: search, mode: "insensitive" },
      },
    }),
  ]);


  return (
    <div className="px-4 py-6 space-y-6 flex justify-center">
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-6">All Companies</h1>
        <CompanyList
          companies={companies}
          total={total}
          page={page}
          pageSize={pageSize}
          search={searchParams.search || ""}
        />
      </div>
    </div>
  );
}