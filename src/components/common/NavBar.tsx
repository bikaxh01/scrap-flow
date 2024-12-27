import { getUserIdServer } from "@/app/config/getUser";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ThemeToggle } from "../ui/Theme-Toggler";

async function NavBar() {
  //const userId = await getUserIdServer();

  return (
    <div className=" w-screen">
      <div className=" flex justify-between  p-1 ml-16 mr-10">
        <div className=" text-2xl font-bold">
          <span className=" text-primary">Scrap</span>-Flow
        </div>
        <div className="  w-[16] flex gap-7">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
