import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateJobApplicationStatus, toggleJobStatus } from "./actions";
import { toast } from "sonner";
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
  const limit = 10;
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

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { status: true },
  });

  if (!job) return notFound();

  const totalCandidates = await prisma.jobApplication.count({
    where: whereFilter,
  });

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
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Applications</h1>
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">
            Status:{" "}
            <Badge variant={job.status === "OPEN" ? "success" : "destructive"}>
              {job.status}
            </Badge>
          </h2>
          <form
            action={async () => {
              "use server";
              await toggleJobStatus(jobId);
            }}
          >
            <Button
              type="submit"
              variant={job.status === "OPEN" ? "destructive" : "default"}
            >
              {job.status === "OPEN" ? "Close Job" : "Reopen Job"}
            </Button>
          </form>
        </div>
      </div>

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
              <th className="px-4 py-2">PHDCCI Approved</th>
              <th className="px-4 py-2">Ministry Approved</th>
              <th className="px-4 py-2">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-muted-foreground">
                  No Data found.
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
                  <td className="px-4 py-2">
                    <form action={updateJobApplicationStatus}>
                      <input type="hidden" name="applicationId" value={app.id} />
                      <select
                        name="newStatus"
                        defaultValue={app.status}
                        className="text-sm border px-2 py-1 rounded"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="SELECTED">Selected</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                      </select>
                      <Button type="submit" size="sm" className="ml-2">
                        Update
                      </Button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {applications.length > 0 && (
        <Pagination page={page} totalPages={totalPages} />
      )}
    </div>
  );
}
