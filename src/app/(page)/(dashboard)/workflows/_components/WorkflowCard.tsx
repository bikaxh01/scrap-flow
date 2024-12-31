import { Button, buttonVariants } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { workflow, WORKFLOWSTATUS } from "@prisma/client";
import { FileIcon, FileTextIcon, PlayIcon, ShuffleIcon } from "lucide-react";
import { Work_Sans } from "next/font/google";
import Link from "next/link";
import React from "react";
import WorkflowActions from "./WorkflowActions";

function WorkflowCard({ workflow }: { workflow: workflow }) {
  const isDraft = workflow.status === WORKFLOWSTATUS.DRAFT;

  return (
    <Card className=" grid grid-cols-1  h-28 rounded-md ">
      <CardContent className=" flex items-center w-full p-4 justify-between">
        <div className="  flex   items-center gap-4 w-full ">
          <div className=" rounded-full size-12 bg-primary/80 flex items-center justify-center ">
            {isDraft ? <FileTextIcon size={30} /> : <PlayIcon size={30} />}
          </div>
          <h2 className=" font-semibold ">{workflow.name}</h2>
          {isDraft && (
            <p
              className={cn(" text-xs  rounded-full pl-2 px-2 py-0.5", {
                " bg-yellow-100 text-yellow-800": isDraft,
              })}
            >
              Draft
            </p>
          )}
        </div>
        <div className=" flex gap-4">
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              " flex gap-2 items-center",
              buttonVariants({
                variant: "outline",
                size: "sm",
              })
            )}
          >
            <ShuffleIcon size={14} />
            Edit
          </Link>

          <WorkflowActions workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
}

export default WorkflowCard;
