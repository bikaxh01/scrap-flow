import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { TaskType } from "@/types/NodeTypes";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CoinsIcon } from "lucide-react";

function NodeHeader({ taskType }: { taskType: TaskType }) {
  const nodeData = TaskRegistry[taskType];
  return (
    <div className=" flex justify-between items-center p-2 m-2">
      <div className=" flex gap-2 items-center text-muted-foreground ">
        <nodeData.icon size={20} />
        {nodeData.label}
      </div>
      <div className=" flex gap-2 items-center ">
        {nodeData.isEntryPoint && (
          <Badge className=" flex items-center text-sm">Entry point</Badge>
        )}
        <Badge className=" flex gap-1 items-center text-sm">
          <CoinsIcon size={15}/> 56
        </Badge>
      </div>
    </div>
  );
}

export default NodeHeader;
