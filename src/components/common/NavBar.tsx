import { getUserIdServer } from "@/app/config/getUser";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ThemeToggle } from "../ui/Theme-Toggler";

async function NavBar() {
  //const userId = await getUserIdServer();

  return (
    <div className=" ">
      <div className=" flex  justify-end  p-1 ml-16 mr-10">
        <div className="  w-[16] flex gap-7">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
