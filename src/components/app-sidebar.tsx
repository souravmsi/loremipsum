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
import { useAuth } from "./auth-provider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useAuth();
  const {role = 'STUDENT'} = user!;

  const studentNav = [
    {
      name: "Jobs",
      url: "/student",
      icon: LayoutDashboard,
    },
    {
      name: "Applied",
      url: "/student/applied-jobs",
      icon: GalleryVerticalEnd,
    },
  ];

  const companyNav = [
    {
      name: "My Job Postings",
      url: "/company",
      icon: BookOpen,
    },
  ];

  const ministryNav = [
    {
      name: "Companies",
      url: "/en",
      icon: GalleryVerticalEnd,
    },
    {
      name: "Approved by PHDCC",
      url: "/en/approved-by-phdcc",
      icon: AudioWaveform,
    },
    {
      name: "Approved by Ministry",
      url: "/en/approved-by-ministry",
      icon: Map,
    },
    {
      name: "Selected Candidates",
      url: "/en/selected-candidates",
      icon: PieChart,
    },
  ];

  const navMap = {
    STUDENT: studentNav,
    COMPANY: companyNav,
    MINISTRY: ministryNav,
    PHDCC: ministryNav,
  };

  const navMain = navMap[role as keyof typeof navMap] || [];

  const data = {
    user: {
      name: "user",
      email: user?.email ?? "user@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
