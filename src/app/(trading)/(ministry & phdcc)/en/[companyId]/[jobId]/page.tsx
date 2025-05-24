import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Pagination from "./pagination";

interface SearchParams {
  page?: string;
  limit?: string;
  name?: string;
  aadhaar?: string;
}

export default async function ApprovedByPhDCCPage({
  params,
  searchParams,
}: {
  params: { companyId: string; jobId: string };
  searchParams: SearchParams;
}) {
  const { jobId } = params;

  const page = parseInt(searchParams.page || "1", 10);
  const limit = Math.min(parseInt(searchParams.limit || "10", 10), 50);
  const nameFilter = searchParams.name?.trim() || "";
  const aadhaarFilter = searchParams.aadhaar?.trim() || "";

  const whereFilter: any = { jobId };

  if (nameFilter || aadhaarFilter) {
    whereFilter.student = {
      ...(nameFilter && {
        name: { contains: nameFilter, mode: "insensitive" },
      }),
      ...(aadhaarFilter && {
        aadhaarNumber: { contains: aadhaarFilter, mode: "insensitive" },
      }),
    };
  }

  const totalCandidates = await prisma.jobApplication.count({ where: whereFilter });

  const applications = await prisma.jobApplication.findMany({
    where: whereFilter,
    include: { student: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  if (!applications.length && page !== 1) return notFound();

  const totalPages = Math.ceil(totalCandidates / limit);

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Approved by PHDCC</h1>

      <form className="flex flex-wrap gap-4" method="GET">
        <Input
          name="name"
          placeholder="Search by Name"
          defaultValue={nameFilter}
          className="w-full sm:w-64"
        />
        <Input
          name="aadhaar"
          placeholder="Search by Aadhaar"
          defaultValue={aadhaarFilter}
          className="w-full sm:w-64"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Aadhaar</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">College</th>
              <th className="px-4 py-2">Resume</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">PHDCC Approved</th>
              <th className="px-4 py-2">Ministry Approved</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-muted-foreground">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-2">{app.student.name}</td>
                  <td className="px-4 py-2">{app.student.aadhaarNumber}</td>
                  <td className="px-4 py-2">{app.student.contact}</td>
                  <td className="px-4 py-2">{app.student.college}</td>
                  <td className="px-4 py-2">
                    {app.student.resume ? (
                      <a
                        href={app.student.resume}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-2 capitalize">{app.status}</td>
                  <td className="px-4 py-2">
                    {app.phdccApproved ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {app.ministryApproved ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {applications.length > 0 && (
        <Pagination page={page} totalPages={totalPages}/>
      )}
    </div>
  );
}
