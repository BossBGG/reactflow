import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import DateTimeNodeComponent from "./DateTimeNode";
import LoGComponent from "./LoG";
import NumberDisplayNodeComponent from "./NumberDisplayNode";
import NumberInputNodeComponent from './NumberInputNode';
import PIDPRComponent from './PIDPR';
import TestNodeComponent from './TestNode';

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
  topInputValue?: number; 
}

export interface TestNodeData {
  label?: string;
  value?: string;
}

export interface LoGNodeData {
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

export interface PIDPRNodeData {
  label?: string;
  value?: string;
}
// กำหนด Node types
export type PositionLoggerNodeType = Node<PositionLoggerNodeData, "position-logger">;
export type DateTimeNode = Node<DateTimeNodeData, "datetime">;
export type LoGNode = Node<LoGNodeData, "LoG">;
export type NumberDisplayNode = Node<NumberDisplayNodeData, "number-display">;
export type NumberInputNode = Node<NumberInputNodeData, "number-input">;
export type PIDPRNode = Node<PIDPRNodeData, "PIDPR">;
export type TestNode = Node<TestNodeData, "test">;
export type AppNode = BuiltInNode | PositionLoggerNodeType | DateTimeNode | LoGNode | NumberDisplayNode | NumberInputNode | PIDPRNode | TestNode;

export const initialNodes: AppNode[] = [
  // { 
  //   id: "a", 
  //   type: "datetime", 
  //   position: { x: 50, y: 50 }, 
  //   data: { 
  //     label: "DATE_TIME",
  //     value: { 
  //       Year: 2025, 
  //       Month: 6, 
  //       Day_Month: 17, 
  //       Hours: 11, 
  //       Minutes: 46, 
  //       Seconds: 45, 
  //       Day_Week: 2 
  //     },
  //     topInputValue: 0 
  //   } 
  // },
  // {
  //   id: "b",
  //   type: "LoG",
  //   position: { x: 650, y: 100 },
  //   data: { 
  //     label: "LoG Filter",
  //     value: "edge-detection" 
  //   },
  // },
  
  // {
  //   id: "c",
  //   type: "number-display",
  //   position: { x: 450, y: 200 },
  //   data: { 
  //     label: "Month",
  //     value: 0,
  //     color: "#3B82F6",
  //     sourceNodeId: "a",
  //     sourceField: "Month"
  //   },
  // },
  // {
  //   id: "d",
  //   type: "number-display",
  //   position: { x: 450, y: 350 },
  //   data: { 
  //     label: "Day Week",
  //     value: 0,
  //     color: "#EF4444",
  //     sourceNodeId: "a",
  //     sourceField: "Day_Week"
  //   },
  // },
  // {
  //   id: "e",
  //   type: "number-display",
  //   position: { x: 450, y: 500 },
  //   data: { 
  //     label: "Seconds",
  //     value: 0,
  //     color: "#F59E0B",
  //     sourceNodeId: "a",
  //     sourceField: "Seconds"
  //   },
  // },
  
  // {
  //   id: "f",
  //   type: "number-display",
  //   position: { x: 700, y: 300 },
  //   data: { 
  //     label: "Empty Box 1",
  //     value: 0,
  //     color: "#10B981"
  //   },
  // },
  // {
  //   id: "g",
  //   type: "number-display",
  //   position: { x: 700, y: 450 },
  //   data: { 
  //     label: "Empty Box 2",
  //     value: 0,
  //     color: "#8B5CF6"
  //   },
  // },
  // {
  //   id: "h",
  //   type: "number-display",
  //   position: { x: 700, y: 600 },
  //   data: { 
  //     label: "Empty Box 3",
  //     value: 0,
  //     color: "#F59E0B"
  //   },
  // },
  // {
  //   id: "i",
  //   type: "number-input",
  //   position: { x: -250, y: 200 },
  //   data: {
  //     text: '5',
  //   },
  // },
  {
    id: "j",
    type: "PIDPR",
    position: { x: 50, y: 50 },
    data: {
      label: "",
      value: "",
    },
  },
  
  {
    id: "l",
    type: "LoG",
    position: { x: 650, y: 10 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  {
    id: "m",
    type: "LoG",
    position: { x: 650, y: 100 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  {
    id: "n",
    type: "LoG",
    position: { x: 650, y: 190 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  {
    id: "o",
    type: "LoG",
    position: { x: 650, y: 280 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  {
    id: "p",
    type: "LoG",
    position: { x: 650, y: 370 },
    data: { 
      label: "LoG Filter",
      value: "edge-detection" 
    },
  },
  {
    id: "k",
    type: "test",
    position: { x: -350, y: 10 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "q",
    type: "test",
    position: { x: -350, y: 100 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "r",
    type: "test",
    position: { x: -350, y: 190 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "s",
    type: "test",
    position: { x: -350, y: 280 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "v",
    type: "test",
    position: { x: -350, y: 370 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "A",
    type: "test",
    position: { x: -150, y: -80 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "B",
    type: "test",
    position: { x: 70, y: -80 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "C",
    type: "test",
    position: { x: 310, y: -80 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "D",
    type: "test",
    position: { x: 70, y: 450 },
    data: {
      label: "",
      value: "",
    },
  },
  {
    id: "F",
    type: "test",
    position: { x: 310, y: 450 },
    data: {
      label: "",
      value: "",
    },
  },
];

export const nodeTypes: NodeTypes = {
  "position-logger": PositionLoggerNode,
  "datetime": DateTimeNodeComponent,
  "LoG": LoGComponent,
  "number-display": NumberDisplayNodeComponent,
  "number-input": NumberInputNodeComponent,
  "PIDPR": PIDPRComponent,
  "test": TestNodeComponent
};