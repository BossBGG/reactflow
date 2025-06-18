import React, { memo, useEffect } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import type { NumberDisplayNodeData } from "./index";

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  left: -8,
  background: "#ffffff",
  border: "2px solid #6B7280",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#374151",
  zIndex: 10,
};

export default memo(({ data, id, isConnectable }: NodeProps<NumberDisplayNodeData>) => {
  const { getNodes, setNodes } = useReactFlow();
  const borderColor = data.color || "#6B7280";
  const bgColor = data.color || "#6B7280";

  // อัปเดทค่าจาก source node
  useEffect(() => {
    if (data.sourceNodeId && data.sourceField) {
      const nodes = getNodes();
      const sourceNode = nodes.find(node => node.id === data.sourceNodeId);
      
      if (sourceNode && sourceNode.type === "datetime") {
        const dateTimeData = sourceNode.data as any;
        const newValue = dateTimeData.value[data.sourceField];
        
        if (newValue !== undefined && newValue !== data.value) {
          setNodes(nodes => 
            nodes.map(node => 
              node.id === id 
                ? { ...node, data: { ...node.data, value: newValue } }
                : node
            )
          );
        }
      }
    }
  }, [data.sourceNodeId, data.sourceField, data.value, id, getNodes, setNodes]);

  return (
    <div 
      className="bg-white border-2 rounded-lg p-6 shadow-lg min-w-[120px] max-w-[120px] h-[120px] relative flex flex-col items-center justify-center"
      style={{ borderColor }}
    >
      {/* Large Number Display */}
      <div className="text-center">
        <div 
          className="text-4xl font-bold mb-1"
          style={{ color: bgColor }}
        >
          {data.value}
        </div>
        {data.label && (
          <div className="text-xs text-gray-500 font-medium">
            {data.label}
          </div>
        )}
      </div>

      {/* Input Handle */}
      <Handle
        type="target"
        id="input"
        position={Position.Left}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "50%",
          transform: "translateY(-50%)",
          borderColor,
        }}
        isConnectable={isConnectable}
      />

      {/* Output Handle */}
      <Handle
        type="source"
        id="output"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          left: "calc(100% - 8px)",
          top: "50%",
          transform: "translateY(-50%)",
          borderColor,
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});