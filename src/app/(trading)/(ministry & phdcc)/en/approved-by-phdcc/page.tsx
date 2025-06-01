import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { SearchForm } from "./search-form";
import { Suspense } from "react";

interface Props {
  searchParams: {
    name?: string;
    aadhaar?: string;
    company?: string;
    page?: string;
    limit?: string
  };
}

export default async function ApprovedByMinistryPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1");
  const take = 10
  const skip = (page - 1) * take;

  const where = {
    phdccApproved: true,
    student: {
      name: searchParams.name ? { contains: searchParams.name, mode: "insensitive" } : undefined,
      aadhaarNumber: searchParams.aadhaar ? { contains: searchParams.aadhaar, mode: "insensitive" } : undefined,
    },
    job: {
      company: {
        name: searchParams.company ? { contains: searchParams.company, mode: "insensitive" } : undefined,
      },
    },
  };

  const [applications, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where,
      include: {
        student: true,
        job: { include: { company: true } },
      },
      skip,
      take,
    }),
    prisma.jobApplication.count({ where }),
  ]);



  return (
    <div className="p-4 space-y-4">
      <div className="mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Approved Candidates by PHDCCI</h1>
        <SearchForm />
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable
            columns={columns}
            data={applications}
            total={total}
            page={page}
            pageSize={take}
          />
        </Suspense>
      </div>
    </div>
  );
}
