import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { NumberDisplayNodeData } from "./index";

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
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
} as React.CSSProperties;

export default memo(({ data, isConnectable }: NodeProps<NumberDisplayNodeData>) => {
  const borderColor = data.color || "#6B7280";
  const bgColor = data.color || "#6B7280";

  return (
    <div 
      className="flex flex-row w-[220px] bg-white border-2 rounded-lg p-6 shadow-lg min-w-[120px] h-[120px] relative  items-center justify-between"
      style={{ borderColor }}
      
    >

      <div className="">
        IN
       </div> 

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
          left: "-8px",
          transform: "translateY(-50%)",
          borderColor,
        }}
        isConnectable={isConnectable}
      >
        <div className="text-gray-900 font-medium text-lg mr-14">
            {data.value}
        </div>
      </Handle> 

      
    </div>
  );
});