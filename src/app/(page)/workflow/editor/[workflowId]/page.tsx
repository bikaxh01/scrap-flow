"use client";
import React from "react";
import Editor from "./_components/Editor";
import { redirect, useParams } from "next/navigation";
import { string } from "zod";
function WorkflowEditor() {
  const { workflowId } = useParams();

  if (!workflowId || typeof workflowId !== 'string' ) {
    return <div>Invalid workflow</div>;
  }

  return (
    <div className="  h-screen">
      <Editor workflowId={workflowId} />
    </div>
  );
}

export default WorkflowEditor;
