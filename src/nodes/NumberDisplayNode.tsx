import React, { memo } from "react";
import { Handle, Position, type NodeProps, useNodeConnections } from "@xyflow/react";
import type { NumberDisplayNodeData } from "./index";

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  background: "#000000",
  border: "2px solid #575353",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#374151",
  zIndex: 10,
} as React.CSSProperties;

export default memo(({ data, id, isConnectable }: NodeProps<NumberDisplayNodeData>) => {
  const borderColor = data.color || "#6B7280";
  const bgColor = data.color || "#6B7280";

  // ตรวจสอบจำนวนการเชื่อมต่อที่ handle นี้
  const connections = useNodeConnections({
    handleType: 'target',
  });

  // จำกัดให้เชื่อมต่อได้แค่ 1 เส้น
  const isConnectionAllowed = connections.length < 1;

  return (
    <div 
      className="flex flex-row w-[220px] bg-white border-2 rounded-lg p-6 shadow-lg min-w-[120px] h-[120px] relative items-center justify-between"
      style={{ borderColor }}
    >
      <div className="text-sm text-gray-600">
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

      {/* Input Handle - จำกัดการเชื่อมต่อแค่ 1 เส้น */}
      <Handle
        type="target"
        id="input"
        position={Position.Left}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "50%",
          left: "-9px",
          transform: "translateY(-50%)",
          borderColor,
          
        }}
        isConnectable={isConnectable && isConnectionAllowed}
      />
    </div>
  );
});