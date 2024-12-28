"use client";
import React from "react";
import { Button } from "../ui/button";
import { Coins, DollarSign, Home, Layers2, ShieldCheck, Spline, Workflow } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import path from "path";
const Routes = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Workflows",
    href: "/workflows",
    icon: Layers2,
  },
  {
    title: "Credentials",
    href: "/credentials",
    icon: ShieldCheck,
  },
  {
    title: "Billing",
    href: "/Billing",
    icon: Coins,
  },
];

function SideBar() {
  const pathName = usePathname();

  return (
    <div className="  h-full   border ">
      <div className=" h-11   p-2  ">
        <div className="  flex  items-center justify-center gap-1 ">
          <div>Lg</div>
          <h1 className=" text-2xl  font-bold">
            <span className=" text-primary">Scrape</span>flow
          </h1>
        </div>
      </div>
      <Separator />
      <div className=" p-2 ">

      <h1 className=" text-gray-500">TODO CREDITS</h1>
      </div>

      <div className=" p-2 pt-0 flex flex-col ">
        {Routes.map((item, index) => {
          return (
            <div>
              <Link
                key={index}
                href={item.href}
                className={` flex  cursor-default items-center  gap-2 p-2    ${
                  pathName === item.href ? " bg-primary text-secondary " : " "
                } rounded-md  text-1xl pr-4 `}
              >
                <div>{<item.icon size={20} />}</div>
                <h1>{item.title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
