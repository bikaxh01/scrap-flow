import React from "react";
import { getWorkflows } from "../../../../../../actions/workflows/Workflows";
import { AlertCircle, InboxIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateWorkflowDialog } from "./CreateWorkflow";
import WorkflowCard from "./WorkflowCard";
async function UserWorkflows() {
  const workflows = await getWorkflows();

  if (!workflows) {
    return (
      <>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (workflows.length === 0) {
    return (
      <>
        <div>
          <Card className=" h-96 ">
            <div className=" items-center gap-4  h-full justify-center flex flex-col">
              <InboxIcon size={60} className="  stroke-primary" />
              <p>No workflow created yet 😲</p>
              <CreateWorkflowDialog />
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div>
      {workflows.map((workflow) => (
        <WorkflowCard workflow={workflow} />
      ))}
    </div>
  );
}

export default UserWorkflows;
