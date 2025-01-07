"use client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  ReactFlowJsonObject,
  useEdgesState,
  useNodesState,
  MarkerType,
  useReactFlow,
} from "@xyflow/react";
import React, { DragEvent, useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./node/NodeComponent";
import customNode from "@/lib/workflow/customNode";
import { AppNode, TaskType } from "@/types/NodeTypes";
import { workflow } from "@prisma/client";
import CustomEdge from "@/components/common/CustomEdge";

const NodeTypes = {
  Node: NodeComponent,
};
const edgeTypes = {
  "custom-edge": CustomEdge,
};
const fitViewOptions = { padding: 2 };

function ReactFlowEditor({ workflow }: { workflow: workflow }) {
  const [nodes, setNodes, onNodeChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition,updateNodeData } = useReactFlow();

  useEffect(() => {
    const workflowData: ReactFlowJsonObject = JSON.parse(workflow.definition);
    if (!workflowData) return;
    //@ts-ignore
    setNodes(workflowData.nodes || []);
    setEdges(workflowData.edges || []);
    if (!workflowData.viewport) return;
    const { x = 0, y = 0, zoom = 1 } = workflowData.viewport;
    setViewport({ x, y, zoom });
  }, [workflow, setNodes, setEdges, setViewport]);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });

    const taskType = e.dataTransfer.getData("application/reactflow");
    if (!taskType) return;

    const newNode = customNode(taskType as TaskType, position);
    setNodes((node) => {
      return node.concat(newNode);
    });
  }, []);

  const onConnect = useCallback(
    (connect: Connection) => {
      console.log("🚀 ~ ReactFlowEditor ~ connect:", connect)
      setEdges((edges) =>
        addEdge(
          {
            ...connect,
            animated: true,
            type: "custom-edge",
            
          },
          edges
        )
      );
      if(!connect.targetHandle) return;
      const node = nodes.find((nds)=>nds.id === connect.target)
      if (!node) return;
      const nodeInputs = node.data.inputs;
        updateNodeData(node.id,{
          inputs:{
            ...nodeInputs,
            [connect.targetHandle]:''
          }
        })
    },
    [setEdges,updateNodeData]
  );

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
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitViewOptions={fitViewOptions}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default ReactFlowEditor;
