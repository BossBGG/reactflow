import React, { memo, useEffect, useMemo } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
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
  const { getNodes, getEdges, setNodes } = useReactFlow();
  const borderColor = data.color || "#6B7280";
  const bgColor = data.color || "#6B7280";

  // ใช้ useMemo เพื่อหาข้อมูลจาก edge และ source node
  const connectionData = useMemo(() => {
    const edges = getEdges();
    const nodes = getNodes();
    
    // หา edge ที่มี target เป็น node นี้
    const incomingEdge = edges.find(edge => edge.target === id);
    
    if (!incomingEdge) {
      return null;
    }
    
    // หา source node
    const sourceNode = nodes.find(node => node.id === incomingEdge.source);
    
    if (!sourceNode || sourceNode.type !== "datetime") {
      return null;
    }
    
    return {
      edge: incomingEdge,
      sourceNode,
      sourceHandle: incomingEdge.sourceHandle
    };
  }, [getEdges, getNodes, id]);

  // อัปเดทข้อมูลเมื่อมีการเชื่อมต่อหรือข้อมูลเปลี่ยน
  useEffect(() => {
    if (!connectionData) {
      return;
    }

    const { sourceNode, sourceHandle } = connectionData;
    const dateTimeData = sourceNode.data as any;
    
    let newValue = data.value;
    let newLabel = data.label;
    
    // กำหนดค่าตาม sourceHandle
    switch (sourceHandle) {
      case "year":
        newValue = dateTimeData.value.Year;
        newLabel = "Year";
        break;
      case "month":
        newValue = dateTimeData.value.Month;
        newLabel = "Month";
        break;
      case "day_month":
        newValue = dateTimeData.value.Day_Month;
        newLabel = "Day";
        break;
      case "hours":
        newValue = dateTimeData.value.Hours;
        newLabel = "Hours";
        break;
      case "minutes":
        newValue = dateTimeData.value.Minutes;
        newLabel = "Minutes";
        break;
      case "seconds":
        newValue = dateTimeData.value.Seconds;
        newLabel = "Seconds";
        break;
      case "day_week":
        newValue = dateTimeData.value.Day_Week;
        newLabel = "Day Week";
        break;
      default:
        break;
    }
    
    // อัปเดท node ถ้าค่าเปลี่ยนแปลง
    if (newValue !== data.value || newLabel !== data.label) {
      setNodes(nodes => 
        nodes.map(node => 
          node.id === id 
            ? { 
                ...node, 
                data: { 
                  ...node.data, 
                  value: newValue,
                  label: newLabel,
                  sourceNodeId: connectionData.edge.source,
                  sourceField: sourceHandle
                } 
              }
            : node
        )
      );
    }
  }, [connectionData, data.value, data.label, id, setNodes]);

  // แสดงสถานะการเชื่อมต่อ
  const isConnected = connectionData !== null;

  return (
    <div 
      className="flex flex-row w-[220px] bg-white border-2 rounded-lg p-6 shadow-lg min-w-[120px] h-[120px] relative items-center justify-between"
      style={{ borderColor }}
    >
      <div className="text-sm text-gray-600">
        {isConnected ? "IN" : "IN"}
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
          left: "-9px",
          transform: "translateY(-50%)",
          borderColor,
        }}
        isConnectable={isConnectable}
      />

      
    </div>
  );
});