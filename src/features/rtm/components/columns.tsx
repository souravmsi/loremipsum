"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import EditableCell from "./editable-cell";
import { Checkbox } from "@/components/ui/checkbox";

interface RTMData {
    blockNumber: number;
    startTime: string;
    endTime: string;
}

export const columns: ColumnDef<RTMData>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "blockNumber",
        accessorKey: "blockNumber",
        header: () => {
            return <Button variant="ghost">Block Number</Button>;
        },
        cell: ({ row }) => {
            return <div className="ml-4">{row.getValue("blockNumber")}</div>;
        },
    },

    {
        id: "startTime",
        accessorKey: "startTime",
        header: () => {
            return <Button variant="ghost">Start TIme</Button>;
        },
        cell: ({ row }) => {
            return <div className="ml-4">{row.getValue("startTime")}</div>;
        },
    },

    {
        id: "endTime",
        accessorKey: "endTime",
        header: () => {
            return <Button variant="ghost">End TIme</Button>;
        },
        cell: ({ row }) => {
            return <div className="ml-4">{row.getValue("endTime")}</div>;
        },
    },

    {
        accessorKey: "price",
        header: () => {
            return <Button variant="ghost">Price (per MW)</Button>;
        },
        cell: EditableCell,
    },

    {
        accessorKey: "volume",
        header: () => {
            return <Button variant="ghost">Volume (MW)</Button>;
        },
        cell: EditableCell,
    },
];
