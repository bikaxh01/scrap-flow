import NavBar from "@/components/common/NavBar";
import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/App-sidebar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-100 p-4">

      <SidebarProvider defaultOpen>
        <AppSidebar  />
      </SidebarProvider>
      </div>

      {/* Main Content */}
      <div className="col-span-9">
        <NavBar />
        <Separator />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
