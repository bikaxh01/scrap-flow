import NavBar from "@/components/common/NavBar";
import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/common/SideBar";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className=" col-span-2 ">
        <SideBar />
      </div>
      {/* Main Content */}
      <div className="col-span-10">
        <NavBar />
        <Separator />
        <div className=" p-2">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
