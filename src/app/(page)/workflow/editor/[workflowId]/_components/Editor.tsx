import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import ReactFlowEditor from "./ReactflowEditor";
import TopBar from "./topbar/TopBar";
import { useQuery } from "@tanstack/react-query";
import { getWorkflow } from "../../../../../../../actions/workflows/Workflows";
import { Loader2 } from "lucide-react";
import WorkflowSidebar from "@/components/common/workflowSidebar";

function Editor({ workflowId }: { workflowId: string }) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getWorkflow(workflowId),
    queryKey: ["workflow"],
  });

  if (error) {
    return <>Error workflow not found</>;
  }

  if (!data) {
    return;
  }

  return (
        <ReactFlowProvider>
          <TopBar title="workspace name" workflowId={workflowId} />
    <div className=" grid grid-cols-12 min-h-screen">
      <div className=" col-span-2"><WorkflowSidebar/></div>
      <div className=" col-span-10">

          <section className=" m-0 flex h-full overflow-auto">
            {isLoading ? (
              <>
                <div className=" flex  flex-col items-center w-screen justify-center">
                  <Loader2 size={80} className=" animate-spin" />
                  <br />
                  <span className=" text-xl text-primary">
                    Getting workflow...
                  </span>
                </div>
              </>
            ) : (
              <ReactFlowEditor workflow={data} />
            )}
          </section>
      </div>
    </div>
        </ReactFlowProvider>

  );
}

export default Editor;
