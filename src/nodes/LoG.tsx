import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { nodeTypes } from ".";


interface InputNodeData {
    value: string;
}

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  right: -1,
  background: "#ffffff",
  border: "2px solid #6B7280",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold",
  color: "#374151",
  zIndex: 10,
};

export default memo(({ data , isConnenctable}: NodeProps<InputNodeData>) => {
    return(
        
        <div className=" bg-white border-2 border-pink-500 rounded-lg p-4 shadow-lg min-w-[280px] relative">
            {/* Header with calendar icon */}
            <div className="flex items-center gap-3 mb-4">
                <div className="border-pink-500 p-2 rounded-md">

                </div>

            </div>

        </div>
    )
})