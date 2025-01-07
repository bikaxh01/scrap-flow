import { InputType, TaskParamType } from "@/types/NodeTypes";
import React, { useCallback } from "react";
import StringInput from "./StringInput";
import { AppNode } from "@/types/NodeTypes";
import { useReactFlow } from "@xyflow/react";
import BrowserInstance from "./BrowserInstance";
function InputFields({ input, nodeId }: { input: InputType; nodeId: string }) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;

  const value = node?.data?.inputs?.[input.name];
 


  const handleNodeUpdate = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node.data.inputs,
          [input.name]: newValue,
        },
      });
    },
    [nodeId, input.name, node]
  );

  switch (input.type) {
    case TaskParamType.STRING:
      return (
        <StringInput
          handleNodeUpdate={handleNodeUpdate}
          value={value}
          input={input}
          nodeId={nodeId}
        />
      );

      case TaskParamType.BROWSER_TO_INSTANCE :
        return (
          <BrowserInstance/>
        )
    default:
      return (
        <div className=" text-muted-foreground font-semibold">
          Not implemented
        </div>
      );
  }
}

export default InputFields;
