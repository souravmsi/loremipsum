"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";

interface BlockType {
    blockNumber: number;
    startTime: string;
    endTime: string;
    price: number;
    volume: number;
}

function RealTimeBidTable({
    onChange,
    data,
}: {
    onChange: (data: BlockType[]) => void;
    data: BlockType[];
}) {
    const [tableData, setTableData] = React.useState(data);
    const [rowSelection, setRowSelection] = React.useState({});

    React.useEffect(() => {
        const bids = Object.keys(rowSelection).map(
            (ele) => tableData[ele as unknown as number]
        );
        onChange(bids);
    }, [tableData, rowSelection, onChange]);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
        meta: {
            updateData: (rowIndex: number, columnId: number, value: number) => {
                setTableData((prev) =>
                    prev.map((row, index) =>
                        index === rowIndex
                            ? { ...row, [columnId]: Number(value) }
                            : row
                    )
                );
            },
        },
    });

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="w-full">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default React.memo(RealTimeBidTable);
