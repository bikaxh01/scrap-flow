import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import ReactFlowEditor from "./ReactflowEditor";
import TopBar from "./topbar/TopBar";

function Editor({ workflowId }: { workflowId: string }) {
  return (
    <ReactFlowProvider>
      <TopBar title="workspace name" workflowId={workflowId} />
      <section className=" m-0 flex h-full overflow-auto">
        <ReactFlowEditor />
      </section>
    </ReactFlowProvider>
  );
}

export default Editor;
