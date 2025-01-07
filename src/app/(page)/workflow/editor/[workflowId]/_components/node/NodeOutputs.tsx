import { OutputType } from "@/types/NodeTypes";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className=" flex flex-col divide-y gap-1">{children}</div>;
}

export function NodeOutput({

  output,
}: {

  output: OutputType;
}) {
  console.log("🚀 ~ output:", output)

  return (
    <div className=" flex justify-end  relative p-3 bg-secondary">
      
       <p className=" text-sm mr-4 text-muted-foreground">
        {output.name}
       </p>
    
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className=" !bg-muted-foreground !border-background !border-2   !w-4 !h-4"
      />
    </div>
  );
}
