import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function WorkflowSkeleton() {
  return (
    <div className=" flex flex-col  gap-3">
      <Skeleton className="w-[99%] h-[80px] " />
      <Skeleton className="w-[99%] h-[80px] " />
      <Skeleton className="w-[99%] h-[80px] " />
      <Skeleton className="w-[99%] h-[80px] " />
    </div>
  );
}

export default WorkflowSkeleton;
