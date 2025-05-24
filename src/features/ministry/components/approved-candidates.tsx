"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type Candidate = {
  id: string;
  status: string;
  ministryApproved: boolean;
  student: {
    name: string;
    contact: string;
    college: string;
    resume: string;
    aadhaarNumber: string;
  };
};

interface ApprovedCandidatesProps {
  candidates: Candidate[];
  jobId: string;
  companyId: string;
  page: number;
  limit: number;
  total: number;
  searchFilters: {
    name: string;
    aadhaar: string;
  };
}

export default function ApprovedCandidates({
  candidates,
  jobId,
  companyId,
  page,
  limit,
  total,
  searchFilters,
}: ApprovedCandidatesProps) {
  const router = useRouter();
  const [name, setName] = useState(searchFilters.name);
  const [aadhaar, setAadhaar] = useState(searchFilters.aadhaar);
  const [isPending, startTransition] = useTransition();
  const [pageLimit, setPageLimit] = useState(limit);

  const totalPages = Math.ceil(total / limit);

  const updateQuery = (
    newPage: number,
    newLimit: number,
    newName: string,
    newAadhaar: string
  ) => {
    const query = new URLSearchParams();
    if (newName) query.set("name", newName);
    if (newAadhaar) query.set("aadhaar", newAadhaar);
    query.set("page", newPage.toString());
    query.set("limit", newLimit.toString());

    startTransition(() => {
      router.push(`/en/${companyId}/${jobId}?${query.toString()}`);
    });
  };

  const handleSearch = () => {
    updateQuery(1, pageLimit, name, aadhaar);
  };

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateQuery(newPage, pageLimit, name, aadhaar);
  };

  return (
    <div>
      {/* Search Inputs */}
      <div className="flex flex-wrap gap-6 mb-6 items-end">
        <div className="flex flex-col flex-grow">
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Candidate name"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <Input
            id="aadhaar"
            type="text"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            placeholder="Aadhaar number"
          />
        </div>

        <Button onClick={handleSearch} disabled={isPending} className="h-10 self-start">
          {isPending ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {candidates.length === 0 ? (
          <p className="text-center text-muted-foreground">No candidates found.</p>
        ) : (
          candidates.map((c) => (
            <div
              key={c.id}
              className="border rounded-md p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{c.student.name}</p>
                <p className="text-sm text-muted-foreground">{c.student.college}</p>
                <p className="text-sm text-muted-foreground">
                  Aadhaar: {c.student.aadhaarNumber}
                </p>
                <a
                  href={c.student.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  Resume
                </a>
              </div>
              <Button
                variant={c.ministryApproved ? "outline" : "default"}
                disabled={c.ministryApproved || isPending}
              >
                {c.ministryApproved ? "Approved" : "Approve"}
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <Button disabled={page <= 1 || isPending} onClick={() => goToPage(page - 1)}>
          Previous
        </Button>

        <span className="flex items-center">
          Page {page} of {totalPages}
        </span>

        <Button disabled={page >= totalPages || isPending} onClick={() => goToPage(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
