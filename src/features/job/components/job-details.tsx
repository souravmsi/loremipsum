import ApplicantsList from './applicants-list';

type JobDetailsProps = {
  job: {
    id: string;
    title: string;
    description: string;
  };
  applicants: {
    id: string;
    name: string;
    contact: string;
    status: 'PENDING' | 'SHORTLISTED' | 'SELECTED' | 'REJECTED';
  }[];
};

export default function JobDetails({ job, applicants }: JobDetailsProps) {
  return (
    <div className="space-y-6 p-6 ">
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">{job.description}</p>
      </div>
      <ApplicantsList applicants={applicants} jobId={job.id} />
    </div>
  );
}
