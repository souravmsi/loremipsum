"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/components/auth-provider";

type Job = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  applied?: boolean;
  company: {
    id: string;
    name: string;
  };
};

type Props = {
  jobs: Job[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

const JobsListing = ({
  jobs: initialJobs,
  page,
  totalPages,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState(initialJobs);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const {user} = useAuth();

  const goToPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(pageNum));
    router.push(`?${params.toString()}`);
  };

  const handleNext = () => {
    if (page < totalPages) goToPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) goToPage(page - 1);
  };

  const applyToJob = async (jobId: string) => {
    try {
      setLoadingIds((prev) => [...prev, jobId]);
      const { id } = user!;

      await axios.post("/api/job/apply", { jobId, userId: id });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, applied: true } : job
        )
      );

      toast.success("Successfully applied for job.");
    } catch (error) {
      toast("Apply Error", {
        description: () => {
          if (error instanceof AxiosError) {
            return error?.response?.data?.message;
          }
          return "Something went wrong!";
        },
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== jobId));
    }
  };

  const confirmApply = (job: Job) => {
    setSelectedJob(job);
    setShowConfirm(true);
  };

  const handleConfirmApply = async () => {
    if (!selectedJob) return;
    await applyToJob(selectedJob.id);
    setShowConfirm(false);
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No jobs available at the moment.
        </p>
      ) : (
        <>
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="border border-gray-200 shadow-sm rounded-2xl transition hover:shadow-md"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-muted-foreground">
                      {job.title}
                    </h2>
                    <Badge
                      variant={job.applied ? "default" : "outline"}
                      className={
                        job.applied
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {job.applied ? "Applied" : "Not Applied"}
                    </Badge>
                  </div>
                  <p className="text-gray-500 font-bold text-sm">
                    {job.description}
                  </p>
                  <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:justify-between pt-2 border-t border-gray-100 mt-2 pt-4">
                    <div>
                      <span className="font-medium text-gray-500">
                        Company:
                      </span>{" "}
                      {job.company.name}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Posted:</span>{" "}
                      {format(new Date(job.createdAt), "dd MMM yyyy")}
                    </div>
                  </div>

                  {!job.applied && (
                    <div className="pt-4">
                      <Button
                        onClick={() => confirmApply(job)}
                        disabled={loadingIds.includes(job.id)}
                      >
                        {loadingIds.includes(job.id)
                          ? "Applying..."
                          : "Apply"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pt-4">
            <Pagination>
              <PaginationContent className="flex justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePrevious}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 text-sm text-muted-foreground font-medium">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNext}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}

      {/* ✅ Confirm Apply Modal */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Application</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-muted-foreground">
            Are you sure you want to apply for{" "}
            <span className="font-medium">{selectedJob?.title}</span>{" "}
            at{" "}
            <span className="font-medium">
              {selectedJob?.company.name}
            </span>
            ?
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmApply}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JobsListing;
