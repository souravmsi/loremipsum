"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    LayoutDashboard,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    GitCompareArrows,
    BellElectric,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "Plant Head",
        email: "planthead@gmrgroup.in",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Home",
            url: "#",
            icon: LayoutDashboard,
            isActive: true,
            items: [
                {
                    title: "RTM",
                    url: "/rtm",
                },
                {
                    title: "DAM",
                    url: "#",
                },
                {
                    title: "Upcoming DAM Predictions",
                    url: "#",
                },
            ],
        },
        {
            title: "DAM",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Bidding",
                    url: "/dam/bidding",
                },
                {
                    title: "Market Data",
                    url: "/dam",
                },
            ],
        },

        {
            title: "RTM",
            url: "#",
            icon: BellElectric,
            items: [
                {
                    title: "Real Time Bids",
                    url: "/rtm/real-time-bids",
                },
                {
                    title: "Advance Bids",
                    url: "/rtm/advance-bids",
                },
                {
                    title: "Market Data",
                    url: "/rtm",
                },
            ],
        },

        {
            title: "DAM vs RTM",
            url: "#",
            icon: GitCompareArrows,
            items: [
                {
                    title: "MCP",
                    url: "#",
                },
                {
                    title: "MCV",
                    url: "#",
                },
                {
                    title: "Tomorrow Predictions",
                    url: "#",
                },
            ],
        },

        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    projects: [
        {
            name: "Clients",
            url: "/clients",
            icon: Bot,
        },
        {
            name: "Ledger",
            url: "#",
            icon: PieChart,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
