'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Student = {
  name: string;
  contact: string;
  email?: string;
  aadhaarNumber: string;
  college: string;
  graduationLevel: string;
  resume: string;
};

type Props = {
  student: Student;
};

export default function StudentProfileModal({ student }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-blue-600 hover:underline">
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{student.name}</DialogTitle>
          <DialogDescription>Candidate Details</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p><strong>Contact:</strong> {student.contact}</p>
          <p><strong>Aadhaar:</strong> {student.aadhaarNumber}</p>
          <p><strong>College:</strong> {student.college}</p>
          <p><strong>Graduation Level:</strong> {student.graduationLevel}</p>
          <p>
            <strong>Resume:</strong>{' '}
            <a
              href={student.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
