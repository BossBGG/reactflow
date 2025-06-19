import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

interface TestNodeData {
  label?: string;
  value?: string;
}

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  background: "#ffffff",
  border: "2px solid #029AD6",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#374151",
  zIndex: 10,
} as React.CSSProperties;

export default memo(({ data, isConnectable }: NodeProps<TestNodeData>) => {
  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg min-w-[200px] max-w-[200px] relative">
      {/* Header with content */}
      <div className="flex items-center justify-center gap-2 mb-3">
        
      </div>
      
      {/* Output Handle - ด้านขวา */}
      <Handle
        type="source"
        id="output"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "50%",
          right: "-8px", // ย้ายไปขวาสุด
          transform: "translateY(-50%)",
        }}
        isConnectable={isConnectable}
      />
      
      {/* Label สำหรับ Handle */}
      <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "50%",
          right: "20px", // ตำแหน่ง label ห่างจาก handle
          transform: "translateY(-50%)",
        }}
      >
        RE
      </div>
    </div>
  );
});