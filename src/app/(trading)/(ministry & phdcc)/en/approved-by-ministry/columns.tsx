"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
  {
    header: "Student Name",
    accessorKey: "student.name",
    cell: ({ row }) => row.original.student.name,
  },
  {
    header: "Aadhaar Number",
    accessorKey: "student.aadhaarNumber",
    cell: ({ row }) => row.original.student.aadhaarNumber,
  },
  {
    header: "Company",
    accessorKey: "job.company.name",
    cell: ({ row }) => row.original.job.company.name,
  },
  {
    header: "Job Title",
    accessorKey: "job.title",
    cell: ({ row }) => row.original.job.title,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/en/approved-by-phdcc/${row.original.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      );
    },
  },
];
