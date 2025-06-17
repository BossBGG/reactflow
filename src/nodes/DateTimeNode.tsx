import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { type DateTimeNode } from "./";

const DEFAULT_HANDLE_STYLE = {
  width: 8,
  height: 8,
  right: -4,
  background: '#6B7280',
  border: '2px solid #fff',
};

export default memo(({ data, isConnectable }: { data: DateTimeNode['data'], isConnectable?: boolean }) => {
  return (
    <>
      <div className="bg-white border-2 border-blue-600 rounded-lg p-4 shadow-lg min-w-[280px]">
        {/* Header with calendar icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-600 p-2 rounded-md">
            <svg 
              className="w-5 h-5 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 9h12v8H4V9z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-lg text-gray-800">DATE_TIME</h3>
        </div>

        {/* Data fields container */}
        <div className="space-y-3">
          {/* Year */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Year</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px]">{data.value.Year}</span>
            </div>
          </div>

          {/* Month - with blue highlight */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Month</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px] text-blue-600">{data.value.Month}</span>
            </div>
          </div>

          {/* Day_Month */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Day_Month</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px]">{data.value.Day_Month}</span>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Hours</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px]">{data.value.Hours}</span>
            </div>
          </div>

          {/* Minutes */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Minutes</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px]">{data.value.Minutes}</span>
            </div>
          </div>

          {/* Seconds */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Seconds</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px]">{data.value.Seconds}</span>
            </div>
          </div>

          {/* Day_Week - with blue highlight */}
          <div className="flex items-center h-6">
            <span className="text-gray-700 flex-1">Day_Week</span>
            <div className="flex items-center gap-3 pr-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="font-medium text-right min-w-[40px] text-blue-600">{data.value.Day_Week}</span>
            </div>
          </div>
        </div>

        {/* Blue connecting lines */}
        <div 
          className="absolute w-6 h-px bg-blue-400" 
          style={{
            right: '2px',
            top: '133px'
          }}
        ></div>

        <div 
          className="absolute w-6 h-px bg-blue-400" 
          style={{
            right: '2px',
            top: '309px'
          }}
        ></div>

        {/* Vertical blue line */}
        <div 
          className="absolute w-px bg-blue-400" 
          style={{
            right: '8px',
            top: '133px',
            height: '176px'
          }}
        ></div>

        {/* All Handles using the same approach as CustomNode */}
        <Handle 
          type="source" 
          id="year"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '92px',
            background: '#6B7280'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="month"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '128px',
            background: '#3B82F6'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="day_month"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '164px',
            background: '#6B7280'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="hours"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '200px',
            background: '#6B7280'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="minutes"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '236px',
            background: '#6B7280'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="seconds"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '272px',
            background: '#6B7280'
          }}
          isConnectable={isConnectable}
        />

        <Handle 
          type="source" 
          id="day_week"
          position={Position.Right}
          style={{ 
            ...DEFAULT_HANDLE_STYLE,
            top: '308px',
            background: '#3B82F6'
          }}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
});