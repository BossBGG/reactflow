import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

// กำหนด type ภายในไฟล์
interface DateTimeNodeData {
  label: string;
  value: {
    Year: number;
    Month: number;
    Day_Month: number;
    Hours: number;
    Minutes: number;
    Seconds: number;
    Day_Week: number;
  };
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

      <div className="flex flex-col mt-6 items-end gap-y-3 ">
        {/* Year */}
        <div className="flex items-center h-6 ">
          <span className="text-gray-700 flex-1">Year</span>
        </div>

        {/* Month - with blue highlight */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Month</span>
        </div>

        {/* Day_Month */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Day_Month</span>
        </div>

        {/* Hours */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Hours</span>
        </div>

        {/* Minutes */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Minutes</span>
        </div>

        {/* Seconds */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Seconds</span>
        </div>

        {/* Day_Week - with blue highlight */}
        <div className="flex items-center h-6">
          <span className="text-gray-700 flex-1">Day_Week</span>
        </div>
      </div>

      {/* All Handles with text labels */}
      <Handle
        type="source"
        id="year"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "89px",

          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Year}</div>
      </Handle>

      <Handle
        type="source"
        id="month"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "125px",
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Month}</div>
      </Handle>

      <Handle
        type="source"
        id="day_month"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "161px", // ปรับให้ตรงกับแถว Day_Month
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Day_Month}</div>
      </Handle>

      <Handle
        type="source"
        id="hours"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "197px",
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Hours}</div>
      </Handle>

      <Handle
        type="source"
        id="minutes"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "233px", // ปรับให้ตรงกับแถว Minutes
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Minutes}</div>
      </Handle>

      <Handle
        type="source"
        id="seconds"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "269px",
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Seconds}</div>
      </Handle>

      <Handle
        type="source"
        id="day_week"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "305px", // ปรับให้ตรงกับแถว Day_Week
          borderColor: "#6B7280",
        }}
        isConnectable={isConnectable}
      >
        <div className="ml-14">{data.value.Day_Week}</div>
      </Handle>
    </div>
  );
});
