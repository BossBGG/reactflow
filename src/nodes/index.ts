import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { DateTimeNode } from "./DateTimeNode";

export type PositionLoggerNode = Node<
  {
    label?: string;
  },
  "position-logger"
>;

export type DateTimeNode = Node<
  {
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
  },
  "datetime"
>;

export type AppNode = BuiltInNode | PositionLoggerNode | DateTimeNode;

export const initialNodes: AppNode[] = [
  { 
    id: "a", 
    type: "datetime", 
    position: { x: 250, y: 50 }, 
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
    type: "position-logger",
    position: { x: 50, y: 300 },
    data: { label: "drag me!" },
  },
  { 
    id: "c", 
    position: { x: 450, y: 300 }, 
    data: { label: "your ideas" } 
  },
  {
    id: "d",
    type: "output",
    position: { x: 250, y: 450 },
    data: { label: "with React Flow" },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "datetime": DateTimeNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;