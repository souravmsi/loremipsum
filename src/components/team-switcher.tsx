import * as React from "react";
import Link from "next/link";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                    <Link href={"/"}>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
                            <Image
                                alt="logo"
                                width={100}
                                height={100}
                                className="size-8"
                                src={"https://www.phdcciinternationalweek.in/themes/custom/phdcci/common/images/logo-final-2024.png"}
                            />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">PHDCCI</span>
                            <span className="text-xs">
                                PHDCCI Jobs Platform
                            </span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
