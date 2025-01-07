import {
    BaseEdge,
    Edge,
    EdgeLabelRenderer,
    EdgeProps,
    getSimpleBezierPath,
    getStraightPath,
    GetStraightPathParams,
    MarkerType,
    useReactFlow,
  } from '@xyflow/react';

import { Button } from '../ui/button';
   
  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY,animated }:EdgeProps) {


   
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSimpleBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
   
    return (
      <>
        <BaseEdge id={id} path={edgePath}    />
        <EdgeLabelRenderer>
          <Button
          variant={"outline"}
           
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan border rounded-full text-xs"
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
           X
          </Button>
        </EdgeLabelRenderer>
      </>
    );
  }