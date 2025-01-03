import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppNode, InputType } from "@/types/NodeTypes";
import { useReactFlow } from "@xyflow/react";
import React, { useCallback, useId, useState } from "react";

function StringInput({
  input,
  nodeId,
  handleNodeUpdate,
  value,
}: {
  value: string;
  input: InputType;
  nodeId: string;
  handleNodeUpdate: (newValue: string) => void;
}) {
  const [initialValue, setInitialValue] = useState(value);
  const id = useId();
  return (
    <div className=" flex flex-col gap-2">
      <Label htmlFor={id} className=" text-xs">
        {input.name}{" "}
        {input.require && (
          <span className=" font-semibold text-red-600">*</span>
        )}
      </Label>
      <Input
        id={id}
        value={initialValue}
        onChange={(e) => setInitialValue(e.target.value)}
        onBlur={() => handleNodeUpdate(initialValue)}
      />
      {input.helperText && (
        <span className=" text-muted-foreground text-xs">
          {input.helperText}
        </span>
      )}
    </div>
  );
}

export default StringInput;
