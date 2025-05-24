"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Job = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  jobs: Job[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

const JobsListing = ({ jobs, limit, page, total, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNum));
    router.push(`?${params.toString()}`);
  };

  const handleNext = () => {
    if (page < totalPages) {
      goToPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      goToPage(page - 1);
    }
  };

  return (
    <>
      {jobs.length === 0 ? (
        <p className="text-center text-muted-foreground">No jobs posted yet.</p>
      ) : (
        <>
          <div className="grid gap-4 mb-4">
            {jobs.map((job) => (
              <Link href={`/company/${job.id}`} key={job.id}>
                <Card key={job.id} className="shadow-sm border rounded-2xl">
                  <CardContent className="p-5 space-y-1">
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={cn(page === 1 ? "pointer-events-none opacity-50" : "", 'cursor-pointer')}
                />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={cn(
                    page === totalPages ? "pointer-events-none opacity-50" : "", 'cursor-pointer'
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
};

export default JobsListing;
