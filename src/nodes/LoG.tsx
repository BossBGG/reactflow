import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

interface LoGNodeData {
  label?: string;
  value?: string;
}

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  left: -8,
  background: "#ffffff",
  border: "2px solid #EC4899",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#374151",
  zIndex: 10,
};

export default memo(({ data, isConnectable }: NodeProps<LoGNodeData>) => {
  return (
    <div className="bg-white border-2 border-pink-500 rounded-lg p-4 shadow-lg min-w-[200px] max-w-[200px] relative">
      {/* Header with LoG icon */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="bg-pink-500 px-3 py-1 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">LoG</span>
        </div>
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
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});