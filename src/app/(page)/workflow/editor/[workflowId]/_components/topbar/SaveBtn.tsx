import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { Check, CheckCheckIcon } from "lucide-react";

import React from "react";
import { updateWorkflow } from "../../../../../../../../actions/workflows/Workflows";
import { toast } from "sonner";

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success("Workflow Saved", { id: "workflow-Save" });
    },
    onError: () => {
      toast.error("something went wrong", { id: "workflow-Save" });
    },
  });

  const handleClick = () => {
    toast.loading("saving...", { id: "workflow-Save" });
    const definitionValue = JSON.stringify(toObject());
    mutate({ id: workflowId, definition: definitionValue });
  };

  return (
    <Button onClick={handleClick} disabled={isPending}>
      <Check size={50} />
      Save
    </Button>
  );
}

export default SaveBtn;
