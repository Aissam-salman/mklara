import * as React from "react"
import {Bot, Frame, SquareM,} from "lucide-react"

import {NavMain} from "@/Components/nav-main"
import {NavProjects} from "@/Components/nav-projects"
import {NavUser} from "@/Components/nav-user"
import {Team} from "@/Components/team"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/Components/ui/sidebar"
import {usePage} from "@inertiajs/react";

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
            title: "Liste des groupes",
            url: route('groups.index'),
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
          ...(user.role === "admin"
            ? [{title: "Ajouter un cours", url: route("courses.create")}]
            : []),
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
