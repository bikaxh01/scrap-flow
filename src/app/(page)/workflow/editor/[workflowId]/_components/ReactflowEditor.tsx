"use client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./node/NodeComponent";
import customNode from "@/lib/workflow/customNode";
import { TaskType } from "@/types/NodeTypes";

const NodeTypes={
 Node:NodeComponent
}
const fitViewOptions ={padding:2}
function ReactFlowEditor() {
  const [nodes, setNodes, onNodeChange] = useNodesState([customNode(TaskType.LAUNCH_BROWSER,{x:10,y:20})]);
  const [edges, setEdges, onEdgeChange] = useEdgesState([]);
  const tempNode = {
    id: "1",
    position: { x: 10, y: 50 },
    data: {
      label: "example",
    },
  };
  return (
    <div
      className=" h-full w-full
    "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgeChange}
        onNodesChange={onNodeChange}
        nodeTypes={NodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default ReactFlowEditor;
