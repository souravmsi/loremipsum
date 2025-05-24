"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  total: number;
  page: number;
  pageSize: number;
}

export function DataTable<TData>({
  columns,
  data,
  total,
  page,
  pageSize,
}: DataTableProps<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  const router = useRouter();
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6 text-gray-500">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {data.length > 0 && (
        <div className="flex justify-between mt-4 items-center text-sm text-gray-600">
          <Button
            disabled={page <= 1}
            onClick={() => router.push(`?page=${page - 1}`)}
          >
            Previous
          </Button>
          <div>
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </div>
          <Button
            disabled={page >= totalPages}
            onClick={() => router.push(`?page=${page + 1}`)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
