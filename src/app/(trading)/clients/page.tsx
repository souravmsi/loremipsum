import React from "react";
import AddClient from "@/features/clients/components/add-client";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/clients/components/columns";
import { DataTable } from "@/features/clients/components/data-table";
import { ClientsReponse, Client } from "@/utils/types";
import { cookies } from "next/headers";
import { DataTablePagination } from "@/features/clients/components/data-table-pagination";

const getData = async (token: string, page: number, pageSize: number) => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/clients/?search=&page=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        const data: ClientsReponse = await response.json();

        if (!data.success) {
            throw Error(data.message || "Something went wrong!!!");
        }
        return data;
    } catch (error) {
        throw error;
    }
};

const ClientsPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { page = 1, pageSize = 20 } = await searchParams;

    const token = (await cookies()).get("token")?.value;

    let data: ClientsReponse;
    try {
        const res = await getData(token!, Number(page), Number(pageSize));
        data = res;
    } catch (error) {
        throw error;
    }

    return (
        <div className="w-full p-4">
            <h2 className=" text-xl font-semibold">Clients</h2>
            <div className="mt-4 flex justify-between">
                <div className="flex gap-x-4">
                    <AddClient />

                    <Button variant={"outline"}>
                        Add/Update Multiple Clients
                    </Button>
                </div>
            </div>
            <DataTable<Client, Client>
                columns={columns}
                data={data.payload.responseData}
            />
            <DataTablePagination
                page={Number(page)}
                pageSize={Number(pageSize)}
                totalDocs={data.payload.totalItems}
            />
        </div>
    );
};

export default ClientsPage;
