import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/Components/ui/sidebar"
import LogoSVG from "@/Components/logo-svg";
import {router} from "@inertiajs/react";

export function Team() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              onClick={() => router.visit(route('dashboard'))}
            >
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LogoSVG width={"20"} height={"20"}/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                                 <span className="truncate font-semibold">
                                    Minkey
                                </span>
                <span className="truncate text-xs">La jungle</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
