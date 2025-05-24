"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { updateApplicantStatus } from "../actions/update-status";
import StudentProfileModal from "./student-profile-modal";

type Applicant = {
  id: string;
  name: string;
  contact: string;
  status: "PENDING" | "SHORTLISTED" | "SELECTED" | "REJECTED";
  student: {
    name: string;
    contact: string;
    aadhaarNumber: string;
    college: string;
    graduationLevel: string;
    resume: string;
  };
};

type Props = {
  applicants: Applicant[];
  jobId: string;
};

export default function ApplicantsList({ applicants, jobId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (appId: string, status: string) => {
    startTransition(() => {
      updateApplicantStatus(appId, status, jobId);
    });
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Applicants</h2>
      {applicants.length === 0 ? (
        <p className="text-muted-foreground">No applicants yet.</p>
      ) : (
        applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex justify-between items-center border p-4 rounded-md"
          >
            <div className="flex gap-x-4 items-center">
              <div>
                <p className="font-medium">{applicant.student.name}</p>
                <p className="text-sm text-muted-foreground">
                  {applicant.student.contact}
                </p>
              </div>
              <StudentProfileModal student={applicant.student} />
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">{applicant.status}</Badge>
              <Select
                defaultValue={applicant.status}
                onValueChange={(value) =>
                  handleStatusChange(applicant.id, value)
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                  <SelectItem value="SELECTED">Selected</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
