import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

interface TestNodeData {
  label?: string;
  value?: string;
}

const DEFAULT_HANDLE_STYLE = {
    width: 16,
    height: 16,
    background: "#000000",
    border: "1px solid #6B7280",
};

export default memo(({ data, isConnectable }: NodeProps<TestNodeData>) => {
  return (
    <div className="flex bg-white border-2 border-indigo-900 rounded-lg w-[160px] h-[80px] items-center justify-center text-center">
      <div className="">
        <div className="font-bold text-indigo-900">Test</div>
      </div>

      <Handle
        type="target"
        id="input"
        position={Position.Left}
        style={{
          ...DEFAULT_HANDLE_STYLE,
        }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
