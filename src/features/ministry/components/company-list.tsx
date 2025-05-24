"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

interface Company {
  id: string;
  name: string;
  location: string;
  contact: string;
}

export default function CompanyList({
  companies,
  total,
  page,
  pageSize,
  search,
}: {
  companies: Company[];
  total: number;
  page: number;
  pageSize: number;
  search: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const totalPages = Math.ceil(total / pageSize);

  const onSearchChange = (value: string) => {
    startTransition(() => {
      router.push(`/en?search=${value}`);
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by company name..."
        defaultValue={search}
        className="mb-6 max-w-lg"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {companies.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No companies found.
        </p>
      ) : (
        <div className="w-full flex flex-col gap-y-4">
          {companies.map((company) => (
            <Link key={company.id} href={`/en/${company.id}`}>
              <Card className="cursor-pointer hover:shadow-md transition">
                <CardContent className="p-4 space-y-1">
                  <h2 className="font-semibold">{company.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {company.location} | {company.contact}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6">
          <Button
            disabled={page <= 1 || isPending}
            onClick={() => router.push(`/en?search=${search}&page=${page - 1}`)}
          >
            Previous
          </Button>
          <div>
            Page {page} of {totalPages}
          </div>
          <Button
            disabled={page >= totalPages || isPending}
            onClick={() => router.push(`/en?search=${search}&page=${page + 1}`)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}