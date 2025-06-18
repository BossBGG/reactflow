import { MarkerType, type Edge, type EdgeTypes } from "@xyflow/react";

export const initialEdges = [
  
  { 
    id: "a-month->c", 
    source: "a", 
    sourceHandle: "month",
    target: "c", 
    targetHandle: "input",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#3B82F6',
    },
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 }
  },
  
  { 
    id: "a-day_week->d", 
    source: "a", 
    sourceHandle: "day_week",
    target: "d", 
    targetHandle: "input",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#EF4444',
    },
    animated: true,
    style: { stroke: '#EF4444', strokeWidth: 2 }
  },
  { 
    id: "a-seconds->e", 
    source: "a", 
    sourceHandle: "seconds",
    target: "e", 
    targetHandle: "input",
    markerEnd: {
      type: MarkerType.Arrow,
      width: 20,
      height: 20,
      color: '#F59E0B',
    },
    animated: true,
    style: { stroke: '#F59E0B', strokeWidth: 2 }
  },
  
  
] satisfies Edge[];

export const edgeTypes = {
  
} satisfies EdgeTypes;