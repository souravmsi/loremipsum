"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [company, setCompany] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (aadhaar) params.set("aadhaar", aadhaar);
    if (company) params.set("company", company);
    router.push(`/en/approved-by-phdcc?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col md:flex-row">
      <Input
        placeholder="Candidate Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <Input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
