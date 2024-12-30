import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { Suspense } from "react";
import WorkflowSkeleton from "./_components/WorkflowSkeleton";
import UserWorkflows from "./_components/UserWorkflows";

function WorkflowsPage() {
  return (
    <div className=" flex h-full flex-col  space-y-4">
      <div className=" flex justify-between">
        <div>
          <h2 className=" text-primary font-bold text-3xl">Workflows</h2>
          <p className=" text-muted-foreground">Manage your workflows</p>
        </div>
        <div>
          <Button>Create Workflow</Button>
        </div>
      </div>
      <Suspense fallback={<WorkflowSkeleton />}>
        <UserWorkflows />
      </Suspense>
    </div>
  );
}

export default WorkflowsPage;
