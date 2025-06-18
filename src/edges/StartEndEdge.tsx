import React from 'react';
import { 
  EdgeProps, 
  getBezierPath, 
  EdgeLabelRenderer,
  BaseEdge,
  MarkerType
} from '@xyflow/react';

interface StartEndEdgeData {
  startLabel?: string;
  endLabel?: string;
}

export default function StartEndEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps<StartEndEdgeData>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // คำนวณตำแหน่ง start label (ใกล้ source)
  const startLabelX = sourceX + (targetX - sourceX) * 0.15;
  const startLabelY = sourceY + (targetY - sourceY) * 0.15;

  // คำนวณตำแหน่ง end label (ใกล้ target)
  const endLabelX = sourceX + (targetX - sourceX) * 0.85;
  const endLabelY = sourceY + (targetY - sourceY) * 0.85;

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        {/* Start Label */}
        {data?.startLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${startLabelX}px,${startLabelY}px)`,
              fontSize: '12px',
              fontWeight: 'bold',
              pointerEvents: 'all',
              backgroundColor: style.stroke || '#666',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              zIndex: 1000,
            }}
            className="nodrag nopan"
          >
            {data.startLabel}
          </div>
        )}
        
        {/* End Label */}
        {data?.endLabel && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${endLabelX}px,${endLabelY}px)`,
              fontSize: '12px',
              fontWeight: 'bold',
              pointerEvents: 'all',
              backgroundColor: style.stroke || '#666',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              zIndex: 1000,
            }}
            className="nodrag nopan"
          >
            {data.endLabel}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}