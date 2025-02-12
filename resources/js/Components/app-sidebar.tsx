import * as React from "react"
import {Bot, Frame, SquareM,} from "lucide-react"

import {NavMain} from "@/Components/nav-main"
import {NavProjects} from "@/Components/nav-projects"
import {NavUser} from "@/Components/nav-user"
import {Team} from "@/Components/team"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/Components/ui/sidebar"
import {usePage} from "@inertiajs/react";
import {Role} from "@/types";


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

  const user = usePage().props.auth.user;

  const data = {
    navMain: [
      {
        title: "Minkey Gang 🐒",
        url: "#",
        icon: SquareM,
        isActive: true,
        items: [
          //TODO: get list of group with title & email
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Minkeyline",
        url: '#',
        icon: Bot,
        items: [
          {
            title: "Les cours",
            url: route('courses.index'),
          },
          {
            title: "Recemment consultée",
            url: "#",
          },
          user.role === Role.Admin ? {
            title: "Ajouter un cours",
            url: route('courses.create'),
          } : null,
        ],
      },
    ],
    projects: [
      {
        name: "Minkeydvisor",
        url: "#",
        icon: Frame,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Team/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        <NavProjects projects={data.projects}/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
