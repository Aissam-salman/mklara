import {usePage} from '@inertiajs/react';
import {PropsWithChildren, ReactNode, useState} from 'react';
import {SidebarInset, SidebarProvider, SidebarTrigger} from '@/Components/ui/sidebar';
import {AppSidebar} from "@/Components/app-sidebar";
import {Separator} from "@/Components/ui/separator";
import DynamicBreadcrumb from "@/Components/DynamicBreadcrumb";

export default function Authenticated({children}: PropsWithChildren<{ header?: ReactNode }>) {

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex bg-sidebar h-16 shrink-0 items-center gap-2 transition-[width,height]
                            ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator orientation="vertical" className="mr-2 h-4"/>
            <DynamicBreadcrumb/>
          </div>
        </header>
        <main className={"flex flex-1 flex-col gap-4 p-4 bg-gray-200"}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>

  );
}
