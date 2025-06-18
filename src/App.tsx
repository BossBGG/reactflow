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
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes, type DateTimeNode } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // จัดการการเชื่อมต่อ edge ใหม่
  const onConnect: OnConnect = useCallback(
    (connection) => {
      console.log("New connection:", connection);
      setEdges((edges) => addEdge({
        ...connection,
        animated: true,
        style: { stroke: '#6B7280', strokeWidth: 2 }
      }, edges));
    },
    [setEdges]
  );

  // ฟังก์ชันสำหรับอัปเดท datetime values และ connected number-display nodes
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
    
    // อัปเดท nodes และ edges พร้อมกัน
    setNodes((currentNodes) => {
      const currentEdges = edges;
      
      // อัปเดท datetime node ก่อน
      const updatedNodes = currentNodes.map(node => {
        if (node.type === "datetime") {
          return {
            ...node,
            data: {
              ...node.data,
              value: newDateTimeValue
            }
          };
        }
        return node;
      });
      
      // หา datetime node ที่อัปเดทแล้ว
      const dateTimeNode = updatedNodes.find(n => n.type === "datetime");
      
      if (!dateTimeNode) return updatedNodes;
      
      // อัปเดท number-display nodes ทั้งแบบตายตัวและแบบ dynamic
      return updatedNodes.map(node => {
        if (node.type === "number-display") {
          const nodeData = node.data as any;
          
          // สำหรับ nodes ที่มี sourceNodeId และ sourceField (แบบตายตัว)
          if (nodeData.sourceNodeId && nodeData.sourceField && dateTimeNode) {
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
          
          // สำหรับ nodes ที่เชื่อมต่อผ่าน edges (แบบ dynamic)
          const incomingEdge = currentEdges.find(edge => edge.target === node.id);
          if (incomingEdge && incomingEdge.source === dateTimeNode.id) {
            const sourceHandle = incomingEdge.sourceHandle;
            
            let newValue = nodeData.value;
            let newLabel = nodeData.label;
            
            // กำหนดค่าตาม sourceHandle
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
              default:
                break;
            }
            
            return {
              ...node,
              data: {
                ...nodeData,
                value: newValue,
                label: newLabel,
                sourceNodeId: incomingEdge.source,
                sourceField: sourceHandle
              }
            };
          }
        }
        
        return node;
      });
    });

    // อัปเดท edge labels ในเวลาเดียวกัน
    setEdges((currentEdges) => {
      return currentEdges.map(edge => {
        if (edge.source === "a") { // DateTime node id
          let newEndLabel = edge.data?.endLabel;
          
          // อัปเดท endLabel ตาม sourceHandle
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
            default:
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

  // เรียก updateDateTime ครั้งแรกเมื่อ component mount เพื่อแก้ bug ค่าเริ่มต้น
  useEffect(() => {
    updateDateTime();
  }, []);

  // อัปเดท datetime ทุกวินาที
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
      
      {/* คำแนะนำการใช้งาน */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-lg max-w-sm">
        <h3 className="font-bold mb-2">🎯 วิธีการใช้งาน:</h3>
        <ol className="text-sm space-y-1">
          <li>1. ลาก Handle จาก DateTime Node</li>
          <li>2. ไปต่อที่ Empty Box ด้านขวา</li>
          <li>3. Box จะแสดงข้อมูลตามที่เชื่อมต่อ</li>
          <li>4. ข้อมูลจะอัปเดทแบบ real-time</li>
        </ol>
        <button
          onClick={updateDateTime}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          อัปเดทเวลาเดี๋ยวนี้
        </button>
      </div>
      
      {/* แสดงข้อมูล edges ปัจจุบัน */}
      <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded shadow-lg">
        <h4 className="font-bold text-sm mb-1">🔗 การเชื่อมต่อปัจจุบัน:</h4>
        <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
          {edges.map(edge => (
            <div key={edge.id} className="text-gray-600">
              {edge.source}({edge.sourceHandle}) → {edge.target}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}