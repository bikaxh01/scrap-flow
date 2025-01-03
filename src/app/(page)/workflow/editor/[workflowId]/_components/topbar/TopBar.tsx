"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React from "react";
import SaveBtn from "./SaveBtn";
import { useRouter } from "next/navigation";

function TopBar({ title, workflowId }: { title: string; workflowId: string }) {
  const router = useRouter();
  return (
    <div className="  bg-transparent flex flex-col justify-center w-full h-10 p-2 border border-b-2 shadow-md ">
      <div className=" flex justify-between">
        <div className=" flex gap-4">
          <Button variant={"outline"} onClick={() => router.back()}>
            <ChevronLeft size={20} />
          </Button>

          <h2 className=" text-xl font-semibold">{title}</h2>
        </div>
        <div>
          <SaveBtn workflowId= {workflowId} />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
