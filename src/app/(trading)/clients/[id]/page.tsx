import ClientDetails from "@/features/client-details/components/client-details";
import ObligationReportDetails from "@/features/client-details/components/obligation-report-details";
import React from "react";
import { cookies } from "next/headers";
import { ClientDetailsResponse } from "@/utils/types";

interface PropTypes {
    params: {
        id: "string";
    };
}

const getData = async (id: string, token: string) => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/clients/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        const data: ClientDetailsResponse = await response.json();

        if (!data.success) {
            throw Error(data.message || "Something went wrong!!!");
        }
        return data;
    } catch (error) {
        throw error;
    }
};

const ClientDetailPage = async ({ params }: PropTypes) => {
    const { id } = await params;

    const token = (await cookies()).get("token")?.value;

    let data: ClientDetailsResponse;
    try {
        const res = await getData(id!, token!);
        data = res;
    } catch (error) {
        throw error;
    }

    const obligationReport = {
        rtm: data.payload.rtm,
        dam: data.payload.dam,
        gdam: data.payload.gdam,
        gtam: data.payload.gtam,
        tam: data.payload.tam,
        rec: data.payload.rec,
    };

    return (
        <div className="w-full p-4 grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
            <ClientDetails data={data.payload} />
            <ObligationReportDetails {...obligationReport} />
        </div>
    );
};

export default ClientDetailPage;
