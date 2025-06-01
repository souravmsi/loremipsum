"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { approveByMinistry } from "./actions";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/components/auth-provider";


function ConfirmDialog({
  open,
  setOpen,
  onConfirm,
  title,
  description,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    header: "Student Name",
    accessorKey: "student.name",
    cell: ({ row }) => row.original.student.name,
  },
  {
    header: "Aadhaar Number",
    accessorKey: "student.aadhaarNumber",
    cell: ({ row }) => row.original.student.aadhaarNumber,
  },
  {
    header: "Company",
    accessorKey: "job.company.name",
    cell: ({ row }) => row.original.job.company.name,
  },
  {
    header: "Job Title",
    accessorKey: "job.title",
    cell: ({ row }) => row.original.job.title,
  },
  {
    header: "Approved by PHDCCI",
    accessorKey: "phdccApproved",
    cell: ({ row }) => {
      const {user} = useAuth();
      const {role: userRole} = user!;
      const [isPending, startTransition] = useTransition();
      const [approved, setApproved] = useState(row.original.phdccApproved);
      const [confirmOpen, setConfirmOpen] = useState(false);
      const [nextValue, setNextValue] = useState<boolean | null>(null);

      const onToggleClick = () => {
        if (userRole !== "PHDCC") {
          toast.error("Only PHDCCI users can approve.");
          return;
        }
        setNextValue(!approved);
        setConfirmOpen(true);
      };

      const onConfirmToggle = () => {
        startTransition(async () => {
          try {
            await approveByPHDCC(row.original.id, nextValue!);
            setApproved(nextValue!);
            toast.success(`PHDCCI approval ${nextValue ? "granted" : "revoked"}`);
          } catch (error) {
            toast.error("Failed to update PHDCCI approval");
          }
        });
      };

      return (
        <>
          <Switch
            checked={approved}
            onCheckedChange={onToggleClick}
            disabled={isPending || userRole !== "PHDCC"}
            aria-label="Toggle PHDCC Approval"
          />
          <ConfirmDialog
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={onConfirmToggle}
            title="Confirm Approval Change"
            description={`Are you sure you want to ${nextValue ? "approve" : "revoke approval"} this application?`}
          />
        </>
      );
    },
  },
  {
    header: "Approved by Ministry",
    accessorKey: "ministryApproved",
    cell: ({ row }) => {
      const [isPending, startTransition] = useTransition();
      const [approved, setApproved] = useState(row.original.ministryApproved);
      const [confirmOpen, setConfirmOpen] = useState(false);
      const [nextValue, setNextValue] = useState<boolean | null>(null);
      const {user} = useAuth();

      const {role: userRole} = user!;

      const onToggleClick = () => {
        if (userRole !== "MINISTRY") {
          toast.error("Only Ministry users can approve.");
          return;
        }
        setNextValue(!approved);
        setConfirmOpen(true);
      };

      const onConfirmToggle = () => {
        startTransition(async () => {
          try {
            await approveByMinistry(row.original.id, nextValue!);
            setApproved(nextValue!);
            toast.success(`Ministry approval ${nextValue ? "granted" : "revoked"}`);
          } catch (error) {
            toast.error("Failed to update Ministry approval");
          }
        });
      };

      return (
        <>
          <Switch
            checked={approved}
            onCheckedChange={onToggleClick}
            disabled={isPending || userRole !== "MINISTRY"}
            aria-label="Toggle Ministry Approval"
          />
          <ConfirmDialog
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={onConfirmToggle}
            title="Confirm Ministry Approval Change"
            description={`Are you sure you want to ${nextValue ? "approve" : "revoke approval"} this application?`}
          />
        </>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/en/approved-by-phdcc/${row.original.id}`}>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </Link>
    ),
  },
];
