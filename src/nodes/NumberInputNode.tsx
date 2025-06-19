import { memo } from "react";
import { Position, Handle, useReactFlow, type NodeProps } from '@xyflow/react';

interface NumberInputNodeData {
  text: string;
}

function NumberInputNode({ id, data }: NodeProps<NumberInputNodeData>) {
  const { updateNodeData } = useReactFlow();

  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg min-w-[200px] relative">
      <div className="text-center mb-3">
        <h4 className="font-semibold text-blue-600"> Number Input</h4>
      </div>
      
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter Value:
        </label>
        <input
          type="number"
          onChange={(e) => updateNodeData(id, { text: e.target.value })}
          value={data.text}
          placeholder="Enter number"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-semibold"
        />
      </div>
      
      <div className="text-center text-sm text-gray-600 mb-2 p-2 bg-gray-50 rounded">
        Current Value: <span className="font-bold text-blue-600">{data.text || "0"}</span>
      </div>
      
      
      
      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: 18,
          height: 18,
          background: "#ffffff",
          border: "3px solid #6B7280",
          borderRadius: "50%",
          right: "-1px",
          zIndex: 10,
        }}
      />
    </div>
  );
}

export default memo(NumberInputNode);