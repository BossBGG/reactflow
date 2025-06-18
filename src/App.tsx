import { useCallback, useEffect } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // จัดการการเชื่อมต่อ edge ใหม่
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("New connection:", connection);
      const newEdge = {
        ...connection,
        animated: true,
        style: { stroke: '#6B7280', strokeWidth: 2 },
        type: 'start-end',
        markerEnd: {
          type: MarkerType.Arrow,
          width: 20,
          height: 20,
          color: '#6B7280',
        },
        data: {
          startLabel: '',
          endLabel: '0',
        }
      };
      setEdges((edges) => addEdge(newEdge, edges));
    },
    [setEdges]
  );

  // ฟังก์ชันสำหรับอัปเดท datetime values
  const updateDateTime = useCallback(() => {
    const now = new Date();
    const newDateTimeValue = {
      Year: now.getFullYear(),
      Month: now.getMonth() + 1,
      Day_Month: now.getDate(),
      Hours: now.getHours(),
      Minutes: now.getMinutes(),
      Seconds: now.getSeconds(),
      Day_Week: now.getDay()
    };
    
    // อัปเดท datetime node และ number-display nodes
    setNodes((currentNodes) => {
      return currentNodes.map(node => {
        if (node.type === "datetime") {
          return {
            ...node,
            data: {
              ...node.data,
              value: newDateTimeValue
            }
          };
        }
        
        // อัปเดท number-display nodes ทั้งแบบ static และ dynamic
        if (node.type === "number-display") {
          const nodeData = node.data as any;
          
          // ตรวจสอบว่า node นี้มี sourceField หรือไม่ (static connection)
          if (nodeData.sourceNodeId && nodeData.sourceField) {
            const newValue = newDateTimeValue[nodeData.sourceField as keyof typeof newDateTimeValue];
            if (newValue !== undefined) {
              return {
                ...node,
                data: {
                  ...nodeData,
                  value: newValue
                }
              };
            }
          }
          
          // ตรวจสอบ dynamic connection ผ่าน edges
          const incomingEdge = edges.find(edge => edge.target === node.id);
          if (incomingEdge && incomingEdge.source === "a") {
            const sourceHandle = incomingEdge.sourceHandle;
            let newValue = nodeData.value;
            let newLabel = nodeData.label;
            
            switch (sourceHandle) {
              case "year":
                newValue = newDateTimeValue.Year;
                newLabel = "Year";
                break;
              case "month":
                newValue = newDateTimeValue.Month;
                newLabel = "Month";
                break;
              case "day_month":
                newValue = newDateTimeValue.Day_Month;
                newLabel = "Day";
                break;
              case "hours":
                newValue = newDateTimeValue.Hours;
                newLabel = "Hours";
                break;
              case "minutes":
                newValue = newDateTimeValue.Minutes;
                newLabel = "Minutes";
                break;
              case "seconds":
                newValue = newDateTimeValue.Seconds;
                newLabel = "Seconds";
                break;
              case "day_week":
                newValue = newDateTimeValue.Day_Week;
                newLabel = "Day Week";
                break;
            }
            
            return {
              ...node,
              data: {
                ...nodeData,
                value: newValue,
                label: newLabel
              }
            };
          }
        }
        
        return node;
      });
    });

    // อัปเดท edge labels
    setEdges((currentEdges) => {
      return currentEdges.map(edge => {
        if (edge.source === "a" && edge.data) {
          let newEndLabel = edge.data.endLabel;
          
          switch (edge.sourceHandle) {
            case "year":
              newEndLabel = newDateTimeValue.Year.toString();
              break;
            case "month":
              newEndLabel = newDateTimeValue.Month.toString();
              break;
            case "day_month":
              newEndLabel = newDateTimeValue.Day_Month.toString();
              break;
            case "hours":
              newEndLabel = newDateTimeValue.Hours.toString();
              break;
            case "minutes":
              newEndLabel = newDateTimeValue.Minutes.toString();
              break;
            case "seconds":
              newEndLabel = newDateTimeValue.Seconds.toString();
              break;
            case "day_week":
              newEndLabel = newDateTimeValue.Day_Week.toString();
              break;
          }
          
          return {
            ...edge,
            data: {
              ...edge.data,
              endLabel: newEndLabel
            }
          };
        }
        return edge;
      });
    });
  }, [setNodes, setEdges, edges]);

  // เรียก updateDateTime ครั้งแรก
  useEffect(() => {
    updateDateTime();
  }, []);

  // อัปเดททุกวินาที
  useEffect(() => {
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [updateDateTime]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      
      {/* UI Info */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-lg max-w-sm">
        <h3 className="font-bold mb-2">🎯 ReactFlow Status:</h3>
        <p className="text-sm">Nodes: {nodes.length}</p>
        <p className="text-sm">Edges: {edges.length}</p>
        <button
          onClick={updateDateTime}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          อัปเดทเวลา
        </button>
      </div>
    </div>
  );
}