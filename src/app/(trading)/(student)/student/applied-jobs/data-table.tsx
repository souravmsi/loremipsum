"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const DataTable = ({ jobs, totalPages, page }) => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Applied Jobs</h1>
      <div>
        <form className="flex gap-4 mb-4" method="GET">
          <Input
            name="title"
            placeholder="Search by Job Title"
            className="w-64"
          />
          <Button type="submit">Search</Button>
        </form>

        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ministry Approved</TableHead>
                <TableHead>PHDCCI Approved</TableHead>
                <TableHead>Applied On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.appliedJobs.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No jobs found.
                  </TableCell>
                </TableRow>
              ) : (
                jobs.appliedJobs.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.job.title}</TableCell>
                    <TableCell>{app.job.description}</TableCell>
                    <TableCell>{app.job.company.name}</TableCell>
                    <TableCell>{app.job.company.contact}</TableCell>
                    <TableCell>{app.job.company.location}</TableCell>
                    <TableCell>
                      <Badge variant={"outline"}>{app.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{app.ministryApproved ? "Yes" : "No"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{app.phdccApproved ? "Yes" : "No"}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {jobs.appliedJobs.length > 0 && (
          <div className="flex justify-between mt-4 items-center text-sm text-gray-600">
            <Button
              disabled={page <= 1}
              onClick={() => router.push(`?page=${page - 1}`)}
            >
              Previous
            </Button>
            <div>
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </div>
            <Button
              disabled={page >= totalPages}
              onClick={() => router.push(`?page=${page + 1}`)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
