'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const statusLabels = {
  PENDING: 'PENDING',
  SHORTLISTED: 'Shortlisted',
  SELECTED: 'Selected',
  REJECTED: 'Rejected',
};

type Job = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  applied?: boolean;
  status: keyof typeof statusLabels;
  company: {
    id: string;
    name: string;
  };
  appliedAt: string;
};

type Props = {
  jobs: Job[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

const AppliedJobs = ({ jobs, page, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageNum));
    router.push(`?${params.toString()}`);
  };

  const handleNext = () => {
    if (page < totalPages) goToPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) goToPage(page - 1);
  };

  const handleStatusFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('status', value);
      params.set('page', '1'); // reset to first page on filter change
    } else {
      params.delete('status');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select
          onValueChange={handleStatusFilterChange}
          defaultValue={searchParams.get('status') || 'PENDING'}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No jobs available with this filter.
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
                      variant={job.applied ? 'default' : 'outline'}
                      className={
                        job.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : job.status === 'SELECTED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }
                    >
                      {statusLabels[job.status]}
                    </Badge>
                  </div>
                  <p className="text-gray-500 font-bold text-sm">{job.description}</p>
                  <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:justify-between pt-2 border-t border-gray-100 mt-2 pt-4">
                    <div>
                      <span className="font-medium text-gray-500">Company:</span>{' '}
                      {job.company.name}
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Applied on:</span>{' '}
                      {format(new Date(job.appliedAt), 'dd MMM yyyy')}
                    </div>
                  </div>
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
                    className={page === 1 ? 'pointer-events-none opacity-50' : ''}
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
                    className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
