import config from "@/config/env";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";


export default async function HomePage() {
    const ck = await cookies();
    const token = ck.get('token')?.value;
    if(!token) redirect('/sign-in');
    try {
        const secret = new TextEncoder().encode(config.JWT.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const role : string = payload.role!;
        if(role !== 'STUDENT') {
            redirect('/student')
        }else if(role !== 'COMPANY') {
            redirect('/company');
        } else{
            redirect('/en');
        }
    } catch {
        redirect('/sign-in');
    }
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="text-white">

            {'ck'}
            </div>
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
    );
}
