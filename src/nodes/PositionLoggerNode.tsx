import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type PositionLoggerNodeData } from "./index";

export function PositionLoggerNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
}: NodeProps<PositionLoggerNodeData>) {
  const x = `${Math.round(positionAbsoluteX || 0)}px`;
  const y = `${Math.round(positionAbsoluteY || 0)}px`;

  return (
    <div className="react-flow__node-default">
      {data?.label && <div>{data.label}</div>}

      <div>
        {x} {y}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}