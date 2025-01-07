import React, { DragEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/NodeTypes";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { Button } from "../ui/button";
function WorkflowSidebar() {
  return (
    <div className="  p-2">
      <div>
        <Accordion
          type="multiple"
          className=" w-full"
          defaultValue={["extraction"]}
        >
          <AccordionItem value="extraction">
            <AccordionTrigger className=" font-bold">
              Data extraction
            </AccordionTrigger>
            <AccordionContent className=" flex flex-col gap-1">
              <TaskMenu taskType={TaskType.PAGE_TO_HTML} />
              <TaskMenu taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function TaskMenu({ taskType }: { taskType: TaskType }) {
  const task = TaskRegistry[taskType];

  
  const handleDrag = (event: DragEvent, taskType: TaskType) => {
    event.dataTransfer.setData("application/reactflow", taskType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Button
      draggable
      variant={"outline"}
      onDragStart={(e) => handleDrag(e, taskType)}
      className=" flex items-center justify-center gap-3 hover:bg-primary/30"
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
}

export default WorkflowSidebar;
