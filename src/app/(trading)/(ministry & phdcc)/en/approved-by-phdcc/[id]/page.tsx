import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";

export default async function CandidateDetail({ params }: { params: { id: string } }) {
  const application = await prisma.jobApplication.findUnique({
    where: { id: params.id },
    include: {
      student: true,
      job: {
        include: {
          company: true,
        },
      },
    },
  });

  if (!application) return notFound();

  const { student, job } = application;
  const { company } = job;

  return (
    <div className="p-6 sm:p-10 w-full mx-auto space-y-12">
      <Link
        href="/en/approved-by-phdcc"
        className="text-blue-600 hover:underline text-sm"
      >
        ← Back to Approved List
      </Link>

      <div className="flex flex-col gap-10 lg:gap-12">
        {/* Candidate Details */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">
            🎓 Candidate Details
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-gray-700 dark:text-gray-200">
            <DetailItem label="Name" value={student.name} />
            <DetailItem label="Aadhaar Number" value={student.aadhaarNumber} />
            <DetailItem label="Contact" value={student.contact} />
            <DetailItem label="College" value={student.college} />
            <DetailItem label="Graduation Level" value={student.graduationLevel} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Resume</p>
              <a
                href={student.resume}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
          </div>
        </section>

        {/* Company Details */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">
            🏢 Company Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-gray-700 dark:text-gray-200">
            <DetailItem label="Name" value={company.name} />
            <DetailItem label="Contact" value={company.contact} />
            <DetailItem label="Location" value={company.location} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Website</p>
              <a
                href={company.website}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">About</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white break-words">{company.about}</p>
            </div>
          </div>
        </section>

        {/* Job Details */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8">
            💼 Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-gray-700 dark:text-gray-200">
            <DetailItem label="Job Title" value={job.title} />
            <DetailItem label="Location" value={job.location || "N/A"} />
            <DetailItem label="Salary" value={job.salary || "N/A"} />
            <DetailItem label="Posted On" value={job.createdAt ? format(new Date(job.createdAt), "PPP") : "N/A"} />
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Description</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white break-words">
                {job.description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">{label}</p>
      <p className="text-base font-semibold text-gray-900 dark:text-white break-words">{value}</p>
    </div>
  );
}
