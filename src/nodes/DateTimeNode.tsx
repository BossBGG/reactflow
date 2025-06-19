import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { DateTimeNodeData } from "./index";

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

const TARGET_HANDLE_STYLE = {
  width: 16,
  height: 16,
  background: "#000000", // สีดำ
  border: "2px solid #6B7280",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#FFFFFF",
  zIndex: 10,
} as React.CSSProperties;

export default memo(({ data, isConnectable }: NodeProps<DateTimeNodeData>) => {
  return (
    <div className="h-[360px] bg-white border-2 border-blue-600 rounded-lg p-4 shadow-lg min-w-[280px] relative">
      {/* Header with calendar icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 p-2 rounded-md">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 9h12v8H4V9z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg text-gray-800">DATE_TIME</h3>
      </div>

      <div className="flex flex-col mt-6 gap-y-3">
        {/* Year */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Year</span>
          <span className="text-gray-900 font-medium">{data.value.Year}</span>
        </div>

        {/* Month */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Month</span>
          <span className="text-gray-900 font-medium">{data.value.Month}</span>
        </div>

        {/* Day_Month */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Day_Month</span>
          <span className="text-gray-900 font-medium">
            {data.value.Day_Month}
          </span>
        </div>

        {/* Hours */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Hours</span>
          <span className="text-gray-900 font-medium">{data.value.Hours}</span>
        </div>

        {/* Minutes */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Minutes</span>
          <span className="text-gray-900 font-medium">
            {data.value.Minutes}
          </span>
        </div>

        {/* Seconds */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Seconds</span>
          <span className="text-gray-900 font-medium">
            {data.value.Seconds}
          </span>
        </div>

        {/* Day_Week */}
        <div className="flex items-center justify-between h-6 w-full">
          <span className="text-gray-700">Day_Week</span>
          <span className="text-gray-900 font-medium">
            {data.value.Day_Week}
          </span>
        </div>
      </div>

      {/* Source Handles (ขวา - สีขาว) */}
      <Handle
        type="source"
        id="year"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "89px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      <Handle
        type="source"
        id="month"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "125px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      <Handle
        type="source"
        id="day_month"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "161px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      <Handle
        type="source"
        id="hours"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "197px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      <Handle
        type="source"
        id="minutes"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "233px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      >
        
      </Handle>

      <Handle
        type="source"
        id="seconds"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "269px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      <Handle
        type="source"
        id="day_week"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "305px",
          right: "-1px",
        }}
        isConnectable={isConnectable}
      ></Handle>

      {/* Target Handles (ซ้าย - สีดำ) */}
      <Handle
        type="target"
        id="year_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "89px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="month_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "125px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="day_month_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "161px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="hours_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "197px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="minutes_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "233px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="seconds_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "269px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="day_week_input"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "305px",
          left: "-1px",
        }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        id="top_input"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "0px",
          left: "140px",
        }}
        isConnectable={isConnectable}
      >
        <div className="mt-8 text-black">
          TopInput
        </div>
      </Handle>

      <Handle
        type="source"
        id="bottom_output"
        position={Position.Bottom}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          bottom: "0px",
          left: "140px",
        }}
        isConnectable={isConnectable}
      >
        <div className="mb-8 text-black"> 
          BottomOutput
        </div>
      </Handle>
    </div>
  );
});
