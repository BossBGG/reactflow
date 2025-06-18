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
  
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  // ฟังก์ชันสำหรับอัปเดท number-display nodes ตามค่าจาก datetime
  const updateNumberDisplayNodes = useCallback(() => {
    setNodes((currentNodes) => {
      const dateTimeNode = currentNodes.find(node => node.type === "datetime") as DateTimeNode;
      if (!dateTimeNode) return currentNodes;

      return currentNodes.map(node => {
        if (node.type === "number-display") {
          const nodeData = node.data as any;
          if (nodeData.sourceNodeId && nodeData.sourceField) {
            const newValue = dateTimeNode.data.value[nodeData.sourceField as keyof typeof dateTimeNode.data.value];
            if (newValue !== undefined && newValue !== nodeData.value) {
              return {
                ...node,
                data: {
                  ...nodeData,
                  value: newValue
                }
              };
            }
          }
        }
        return node;
      });
    });
  }, [setNodes]);

  // อัปเดท number display nodes เมื่อ datetime node เปลี่ยนแปลง
  useEffect(() => {
    updateNumberDisplayNodes();
  }, [nodes, updateNumberDisplayNodes]);

  // ฟังก์ชันสำหรับอัปเดท datetime values (สำหรับทดสอบ)
  const updateDateTime = useCallback(() => {
    const now = new Date();
    setNodes((currentNodes) => 
      currentNodes.map(node => 
        node.type === "datetime" 
          ? {
              ...node,
              data: {
                ...node.data,
                value: {
                  Year: now.getFullYear(),
                  Month: now.getMonth() + 1,
                  Day_Month: now.getDate(),
                  Hours: now.getHours(),
                  Minutes: now.getMinutes(),
                  Seconds: now.getSeconds(),
                  Day_Week: now.getDay()
                }
              }
            }
          : node
      )
    );
  }, [setNodes]);

  // อัปเดท datetime ทุกวินาที (สำหรับการทดสอบ)
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
      
      {/* ปุ่มสำหรับทดสอบการอัปเดท */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={updateDateTime}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          อัปเดทเวลาปัจจุบัน
        </button>
      </div>
    </div>
  );
}