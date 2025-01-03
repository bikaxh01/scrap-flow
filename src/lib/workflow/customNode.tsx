import { AppNode, TaskType } from "@/types/NodeTypes";

function customNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode {
  return {
    id: crypto.randomUUID(),
    position: position ?? { x: 0, y: 0 },

    type: "Node",
    data: {
      inputs: {},
      type: nodeType,
    },
  };
}

export default customNode;
