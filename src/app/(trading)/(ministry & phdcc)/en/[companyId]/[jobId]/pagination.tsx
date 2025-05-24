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

const Pagination = ({ page, totalPages }) => {
  const router = useRouter();
  return (
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
  );
};

export default Pagination;
