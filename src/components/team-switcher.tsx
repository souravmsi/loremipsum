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
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIvuu-6zzjrqxy5jczL-yiQQRE3DKWLckbQ&s"}
                            />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-semibold">PHDCC</span>
                            <span className="text-xs">
                                PHDCC Jobs Platform
                            </span>
                        </div>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
