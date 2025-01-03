import { InputType } from "@/types/NodeTypes";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import InputFields from "./InputFields";

export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="  border border-t-2 p-2">{children}</div>;
}

export function NodeInput({ input,nodeId }: { input: InputType,nodeId:string }) {

  return (
    <div>
      <InputFields nodeId={nodeId}  input={input}/>
      {!input.hideHandle && (
        <Handle
          id={input.name}
          position={Position.Left}
          type="target"
          className=" !bg-muted-foreground !border-background !border-2  !w-4 !h-4"
        />
      )}
    </div>
  );
}
