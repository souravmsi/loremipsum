"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createJobAction } from "@/app/(trading)/(company)/company/actions"; // adjust path if needed
import { useAuth } from "@/components/auth-provider";

export function CreateJobModal() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {user} = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("userId", user!.id);

    startTransition(async () => {
      try {
        await createJobAction(formData);
        setOpen(false);
        toast.success("Job created successfully");
      } catch (error) {
        toast.error("Failed to create job");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input name="title" placeholder="Job Title" />
          </div>
          <div>
            <Textarea name="description" placeholder="Job Description" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
