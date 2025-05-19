"use client";

import { useCallback } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
    pageSizeOptions?: number[];
    page: number;
    pageSize: number;
    totalDocs: number;
}

export function DataTablePagination({
    pageSizeOptions = [10, 20, 30, 40, 50],
    page,
    pageSize,
    totalDocs,
}: DataTablePaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalDocs / pageSize);

    const pageHandler = useCallback(
        (newPage: number) => {
            const key = "page";
            if (!searchParams) return `${pathname}?${key}=${newPage}`;
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(key, String(newPage));
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [searchParams, pathname, router]
    );

    const navToPageSize = useCallback(
        (newPageSize: number) => {
            const key = "pageSize";
            const newSearchParams = new URLSearchParams(
                searchParams || undefined
            );
            newSearchParams.set(key, String(newPageSize));
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [searchParams, pathname, router]
    );

    return (
        <div className="flex w-full mt-2 flex-col-reverse items-center justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap text-sm font-medium">
                        Rows per page
                    </p>
                    <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => {
                            navToPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[4.5rem]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent
                            side="top"
                            className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/40"
                        >
                            {pageSizeOptions.map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        className="hidden size-8 p-0 lg:flex"
                        onClick={() => pageHandler(1)}
                        disabled={page === 1}
                    >
                        <ChevronsLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => pageHandler(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeftIcon
                            className="size-4"
                            aria-hidden="true"
                        />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => pageHandler(page + 1)}
                        disabled={page === totalPages}
                    >
                        <ChevronRightIcon
                            className="size-4"
                            aria-hidden="true"
                        />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => pageHandler(totalPages)}
                        disabled={page === totalPages}
                    >
                        <ChevronsRight className="size-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
