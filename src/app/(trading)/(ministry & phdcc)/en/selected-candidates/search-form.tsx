"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SearchForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [name, setName] = useState(params.get("name") || "");
  const [aadhaar, setAadhaar] = useState(params.get("aadhaar") || "");
  const [company, setCompany] = useState(params.get("company") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      ...(name && { name }),
      ...(aadhaar && { aadhaar }),
      ...(company && { company }),
    });
    router.push(`/en/selected-candidates?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4 flex-col md:flex-row">
      <Input placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Aadhaar Number" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} />
      <Input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
      <Button type="submit">Search</Button>
    </form>
  );
}
