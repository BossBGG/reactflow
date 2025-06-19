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
  
  // Debug: ตรวจสอบ nodeTypes
  console.log("Available nodeTypes:", Object.keys(nodeTypes));
  console.log("Current nodes:", nodes.map(n => ({ id: n.id, type: n.type })));
  
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
          color: '#000000',
        }
        
      };
      setEdges((edges) => addEdge(newEdge, edges));
    },
    [setEdges]
  );

  // ฟังก์ชันสำหรับอัปเดท datetime values
  const updateDateTime = useCallback(() => {
    const now = new Date();
    let baseDateTime = {
      Year: now.getFullYear(),
      Month: now.getMonth() + 1,
      Day_Month: now.getDate(),
      Hours: now.getHours(),
      Minutes: now.getMinutes(),
      Seconds: now.getSeconds(),
      Day_Week: now.getDay()
    };

    // เพิ่มค่าจาก NumberInput connections
    setNodes((currentNodes) => {
      // หาค่าเพิ่มเติมจาก NumberInput nodes
      const dateTimeNode = currentNodes.find(node => node.id === "a" && node.type === "datetime");
      if (dateTimeNode) {
        let additionalValues = {
          Year: 0, Month: 0, Day_Month: 0, Hours: 0, Minutes: 0, Seconds: 0, Day_Week: 0
        };
        let topInputValue = 0;

        // ตรวจสอบ incoming edges จาก number-input nodes
        const incomingEdges = edges.filter(edge => edge.target === "a");
        
        incomingEdges.forEach(edge => {
          const sourceNode = currentNodes.find(n => n.id === edge.source);
          if (sourceNode && sourceNode.type === "number-input") {
            const inputValue = parseInt((sourceNode.data as any).text) || 0;
            
            // เพิ่มค่าตาม targetHandle
            if (edge.targetHandle === "top_input") {
              topInputValue = inputValue; // เก็บค่าสำหรับ top input
            } else {
              switch (edge.targetHandle) {
                case "year_input":
                  additionalValues.Year += inputValue;
                  break;
                case "month_input":
                  additionalValues.Month += inputValue;
                  break;
                case "day_month_input":
                  additionalValues.Day_Month += inputValue;
                  break;
                case "hours_input":
                  additionalValues.Hours += inputValue;
                  break;
                case "minutes_input":
                  additionalValues.Minutes += inputValue;
                  break;
                case "seconds_input":
                  additionalValues.Seconds += inputValue;
                  break;
                case "day_week_input":
                  additionalValues.Day_Week += inputValue;
                  break;
              }
            }
          }
        });

        // รวมค่าพื้นฐานกับค่าเพิ่มเติม
        baseDateTime = {
          Year: baseDateTime.Year + additionalValues.Year,
          Month: baseDateTime.Month + additionalValues.Month,
          Day_Month: baseDateTime.Day_Month + additionalValues.Day_Month,
          Hours: baseDateTime.Hours + additionalValues.Hours,
          Minutes: baseDateTime.Minutes + additionalValues.Minutes,
          Seconds: baseDateTime.Seconds + additionalValues.Seconds,
          Day_Week: baseDateTime.Day_Week + additionalValues.Day_Week
        };

        // อัปเดท datetime node พร้อม topInputValue
        return currentNodes.map(node => {
          if (node.type === "datetime") {
            return {
              ...node,
              data: {
                ...node.data,
                value: baseDateTime,
                topInputValue: topInputValue
              }
            };
          }
          return node;
        });
      }

      // อัปเดท datetime node
      return currentNodes.map(node => {
        if (node.type === "datetime") {
          return {
            ...node,
            data: {
              ...node.data,
              value: baseDateTime
            }
          };
        }
        return node;
      });
    });
    
    // ส่งข้อมูลใหม่ไปยัง updateConnectedNodes
    return baseDateTime;
  }, [setNodes, edges]);

  // ฟังก์ชันแยกสำหรับอัปเดท connected nodes
  const updateConnectedNodes = useCallback((dateTimeValue: any) => {
    // อัปเดท number-display nodes
    setNodes((currentNodes) => {
      return currentNodes.map(node => {
        if (node.type === "number-display") {
          const nodeData = node.data as any;
          
          // ตรวจสอบ static connection
          if (nodeData.sourceNodeId && nodeData.sourceField) {
            const newValue = dateTimeValue[nodeData.sourceField as keyof typeof dateTimeValue];
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
          
          // ตรวจสอบ dynamic connection
          const incomingEdge = edges.find(edge => edge.target === node.id);
          if (incomingEdge && incomingEdge.source === "a") {
            const sourceHandle = incomingEdge.sourceHandle;
            let newValue = 0;
            let newLabel = nodeData.label;
            
            // จัดการ bottom_output - ส่งค่าจาก topInputValue
            if (sourceHandle === "bottom_output") {
              const dateTimeNode = currentNodes.find(n => n.id === "a");
              if (dateTimeNode && dateTimeNode.type === "datetime") {
                newValue = (dateTimeNode.data as any).topInputValue || 0;
                newLabel = "Top Input Value";
              }
            } else {
              switch (sourceHandle) {
                case "year":
                  newValue = dateTimeValue.Year;
                  newLabel = "Year";
                  break;
                case "month":
                  newValue = dateTimeValue.Month;
                  newLabel = "Month";
                  break;
                case "day_month":
                  newValue = dateTimeValue.Day_Month;
                  newLabel = "Day";
                  break;
                case "hours":
                  newValue = dateTimeValue.Hours;
                  newLabel = "Hours";
                  break;
                case "minutes":
                  newValue = dateTimeValue.Minutes;
                  newLabel = "Minutes";
                  break;
                case "seconds":
                  newValue = dateTimeValue.Seconds;
                  newLabel = "Seconds";
                  break;
                case "day_week":
                  newValue = dateTimeValue.Day_Week;
                  newLabel = "Day Week";
                  break;
              }
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
        // อัปเดท edges จาก DateTime node
        if (edge.source === "a" && edge.data) {
          let newEndLabel = edge.data.endLabel;
          
          // จัดการ bottom_output edge
          if (edge.sourceHandle === "bottom_output") {
            const dateTimeNode = nodes.find(n => n.id === "a");
            if (dateTimeNode && dateTimeNode.type === "datetime") {
              newEndLabel = ((dateTimeNode.data as any).topInputValue || 0).toString();
            }
          } else {
            switch (edge.sourceHandle) {
              case "year":
                newEndLabel = dateTimeValue.Year.toString();
                break;
              case "month":
                newEndLabel = dateTimeValue.Month.toString();
                break;
              case "day_month":
                newEndLabel = dateTimeValue.Day_Month.toString();
                break;
              case "hours":
                newEndLabel = dateTimeValue.Hours.toString();
                break;
              case "minutes":
                newEndLabel = dateTimeValue.Minutes.toString();
                break;
              case "seconds":
                newEndLabel = dateTimeValue.Seconds.toString();
                break;
              case "day_week":
                newEndLabel = dateTimeValue.Day_Week.toString();
                break;
            }
          }
          
          return {
            ...edge,
            data: {
              ...edge.data,
              endLabel: newEndLabel
            }
          };
        }
        
        // อัปเดท edges จาก NumberInput nodes
        if (edge.target === "a" && edge.data) {
          const sourceNode = nodes.find(n => n.id === edge.source);
          if (sourceNode && sourceNode.type === "number-input") {
            const inputValue = (sourceNode.data as any).text || "0";
            
            return {
              ...edge,
              data: {
                ...edge.data,
                endLabel: inputValue
              }
            };
          }
        }
        
        return edge;
      });
    });
  }, [setNodes, setEdges, edges, nodes]);

  // เรียก updateDateTime ครั้งแรก
  useEffect(() => {
    const dateTimeValue = updateDateTime();
    if (dateTimeValue) {
      setTimeout(() => updateConnectedNodes(dateTimeValue), 100);
    }
  }, []);

  // อัปเดททุกวินาที
  useEffect(() => {
    const interval = setInterval(() => {
      const dateTimeValue = updateDateTime();
      if (dateTimeValue) {
        setTimeout(() => updateConnectedNodes(dateTimeValue), 50);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [updateDateTime, updateConnectedNodes]);

  // อัปเดท connected nodes เมื่อ edges เปลี่ยน
  useEffect(() => {
    const now = new Date();
    const currentDateTimeValue = {
      Year: now.getFullYear(),
      Month: now.getMonth() + 1,
      Day_Month: now.getDate(),
      Hours: now.getHours(),
      Minutes: now.getMinutes(),
      Seconds: now.getSeconds(),
      Day_Week: now.getDay()
    };
    updateConnectedNodes(currentDateTimeValue);
  }, [edges.length]); // เมื่อมี edge ใหม่

  // อัปเดทเมื่อ node data เปลี่ยน (เช่น NumberInput value เปลี่ยน)
  useEffect(() => {
    const dateTimeValue = updateDateTime();
    if (dateTimeValue) {
      setTimeout(() => updateConnectedNodes(dateTimeValue), 50);
    }
  }, [nodes.map(n => JSON.stringify(n.data)).join(',')]); // เมื่อ node data เปลี่ยน

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
          onClick={() => {
            const dateTimeValue = updateDateTime();
            if (dateTimeValue) {
              updateConnectedNodes(dateTimeValue);
            }
          }}
          className="mt-3 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          อัปเดทเวลา
        </button>
      </div>
    </div>
  );
}