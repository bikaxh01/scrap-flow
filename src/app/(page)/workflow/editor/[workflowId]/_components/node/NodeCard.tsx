import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import React, { ReactNode } from "react";

function NodeCard({
  nodeId,
  children,
  isSelected,
}: {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
}) {
  const { getNode, setCenter } = useReactFlow();

  //onDouble click move the node to center
  const handleDoubleClick = () => {
    const node = getNode(nodeId);
    if (!node) return;
    const { position, measured } = node;

    if (!position || !measured) return;
    const { height, width } = measured;

    if (!height || !width) return;
    const x = position.x + width / 2;
    const y = position.x + height / 2;
    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };
  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={cn(
        " w-[420px] border-2 bg-white shadow-md cursor-pointer rounded-sm",
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
}

export default NodeCard;
