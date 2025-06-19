import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import DateTimeNodeComponent from "./DateTimeNode";
import LoGComponent from "./LoG";
import NumberDisplayNodeComponent from "./NumberDisplayNode";
import NumberInputNodeComponent from './NumberInputNode';
import TestComponent from "./test";

// กำหนด interface แยกจาก Node type
export interface DateTimeNodeData {
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

export interface LoGNodeData {
  label?: string;
  value?: string;
}

export interface TestComponent {
  label?: string;
  value?: string;
}

export interface NumberDisplayNodeData {
  label?: string;
  value: number;
  color?: string;
  sourceNodeId?: string;
  sourceField?: string;
}

export interface NumberInputNodeData {
  text: string;
}

export interface PositionLoggerNodeData {
  label?: string;
}

// กำหนด Node types
export type PositionLoggerNodeType = Node<PositionLoggerNodeData, "position-logger">;
export type DateTimeNode = Node<DateTimeNodeData, "datetime">;
export type LoGNode = Node<LoGNodeData, "LoG">;
export type TestNode = Node<TestComponent, "test">
export type NumberDisplayNode = Node<NumberDisplayNodeData, "number-display">;
export type NumberInputNode = Node<NumberInputNodeData, "number-input">;

export type AppNode = BuiltInNode | PositionLoggerNodeType | DateTimeNode | LoGNode | TestNode| NumberDisplayNode | NumberInputNode;

export const initialNodes: AppNode[] = [
  { 
    id: "a", 
    type: "datetime", 
    position: { x: 50, y: 50 }, 
    data: { 
      label: "DATE_TIME",
      value: { 
        Year: 2025, 
        Month: 6, 
        Day_Month: 17, 
        Hours: 11, 
        Minutes: 46, 
        Seconds: 45, 
        Day_Week: 2 
      } 
    } 
  },
  {
    id: "b",
    type: "LoG",
    position: { x: 650, y: 100 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  // NumberDisplayNodes ที่มีการเชื่อมต่อตายตัว
  {
    id: "c",
    type: "number-display",
    position: { x: 450, y: 200 },
    data: { 
      label: "Month",
      value: 0,
      color: "#3B82F6",
      sourceNodeId: "a",
      sourceField: "Month"
    },
  },
  {
    id: "d",
    type: "number-display",
    position: { x: 450, y: 350 },
    data: { 
      label: "Day Week",
      value: 0,
      color: "#EF4444",
      sourceNodeId: "a",
      sourceField: "Day_Week"
    },
  },
  {
    id: "e",
    type: "number-display",
    position: { x: 450, y: 500 },
    data: { 
      label: "Seconds",
      value: 0,
      color: "#F59E0B",
      sourceNodeId: "a",
      sourceField: "Seconds"
    },
  },
  // NumberDisplayNodes ว่างสำหรับทดสอบ
  {
    id: "f",
    type: "number-display",
    position: { x: 700, y: 300 },
    data: { 
      label: "Empty Box 1",
      value: 0,
      color: "#10B981"
    },
  },
  {
    id: "g",
    type: "number-display",
    position: { x: 700, y: 450 },
    data: { 
      label: "Empty Box 2",
      value: 0,
      color: "#8B5CF6"
    },
  },
  {
    id: "h",
    type: "number-display",
    position: { x: 700, y: 600 },
    data: { 
      label: "Empty Box 3",
      value: 0,
      color: "#F59E0B"
    },
  },
  // NumberInputNode
  {
    id: "i",
    type: "number-input",
    position: { x: -300, y: 200 },
    data: {
      text: '5',
    },
  },
  {
    id: "j",
    type: "test",
    position: { x: 700, y: 200 },
    data: { 
      label: "Test",
      value: "" 
    },
  },
];

export const nodeTypes: NodeTypes = {
  "position-logger": PositionLoggerNode,
  "datetime": DateTimeNodeComponent,
  "LoG": LoGComponent,
  "test": TestComponent,
  "number-display": NumberDisplayNodeComponent,
  "number-input": NumberInputNodeComponent, 
};