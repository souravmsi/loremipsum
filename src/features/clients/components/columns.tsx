"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Client } from "@/utils/types";
import Link from "next/link";

export const columns: ColumnDef<Client>[] = [
    {
        id: "serialNumber",
        header: () => {
            return <Button variant="ghost">S.No.</Button>;
        },
        cell: ({ row }) => {
            return <div className="ml-4">{row.index + 1}</div>;
        },
    },
    {
        accessorKey: "portfolioName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Portfolio Name
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize  pl-4">
                {row.getValue("portfolioName")}
            </div>
        ),
    },
    {
        accessorKey: "portfolioCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Portfolio Code
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className=" uppercase pl-4">
                {row.getValue("portfolioCode")}
            </div>
        ),
    },
    {
        accessorKey: "isActive",
        header: () => {
            return <Button variant="ghost">Active Status</Button>;
        },
        cell: ({ row }) => {
            return (
                <Switch className="ml-4" checked={row.getValue("isActive")} />
            );
        },
    },
    {
        accessorKey: "id",
        id: "actions",
        enableHiding: false,
        header: () => {
            return <Button variant="ghost">Action</Button>;
        },
        cell: ({ row }) => {
            return (
                <Link
                    className="text-primary underline-offset-4 hover:underline ml-4"
                    href={`/clients/${row.original.id}`}
                >
                    View Details
                </Link>
            );
        },
    },
];
