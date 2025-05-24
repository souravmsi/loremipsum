"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Job = {
  id: string;
  title: string;
  description: string;
};

interface JobListProps {
  jobs: Job[];
  companyId: string;
  page: number;
  limit: number;
  total: number;
  search: string;
}

export default function JobList({
  jobs,
  companyId,
  page,
  limit,
  total,
  search,
}: JobListProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const totalPages = Math.ceil(total / limit);

  const handleSearch = () => {
    router.push(
      `/en/${companyId}?page=1&limit=${limit}&search=${encodeURIComponent(
        searchInput
      )}`
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div >
        <form className="flex items-center gap-2 mb-4" onSubmit={(e)=>{
          e.preventDefault();
          handleSearch();
        }}>
          <Input
            type="text"
            placeholder="Search jobs by title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border max-w-lg rounded-md px-3 py-2 flex-grow"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <>
          {jobs.map((job) => (
            <Link key={job.id} href={`/en/${companyId}/${job.id}`}>
              <Card className="cursor-pointer hover:shadow-md transition">
                <CardContent className="p-4 space-y-1">
                  <h2 className="font-semibold">{job.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {/* Pagination Controls */}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    router.push(
                      `/en/${companyId}?page=${
                        page - 1
                      }&limit=${limit}&search=${encodeURIComponent(
                        searchInput
                      )}`
                    )
                  }
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    router.push(
                      `/en/${companyId}?page=${
                        page + 1
                      }&limit=${limit}&search=${encodeURIComponent(
                        searchInput
                      )}`
                    )
                  }
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
