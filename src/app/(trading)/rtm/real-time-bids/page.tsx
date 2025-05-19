import React from "react";
import { ClientsReponse } from "@/utils/types";
import { cookies } from "next/headers";
import RealTimeBids from "@/features/rtm/components/real-time-bids";

const getData = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/api/clients`,
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

const RealTimeBidsPage = async () => {
    const token = (await cookies()).get("token")?.value;

    let data: ClientsReponse;
    try {
        const res = await getData(token!);
        data = res;
    } catch (error) {
        throw error;
    }
    const options = data.payload.responseData.map((client) => ({
        label: client.portfolioName,
        value: client.id,
    }));
    return (
        <div className="p-4">
            <RealTimeBids data={options} />
        </div>
    );
};

export default RealTimeBidsPage;
