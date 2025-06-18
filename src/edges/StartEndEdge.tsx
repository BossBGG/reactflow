import React, { type FC } from 'react';
import { 
  getBezierPath, 
  EdgeLabelRenderer, 
  BaseEdge, 
  type EdgeProps,
  type Edge 
} from '@xyflow/react';

// Helper component สำหรับแสดง edge label
function EdgeLabel({ 
  transform, 
  label, 
  backgroundColor = '#666' 
}: { 
  transform: string; 
  label: string; 
  backgroundColor?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        background: backgroundColor,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        transform,
        zIndex: 1000,
      }}
      className="nodrag nopan"
    >
      {label}
    </div>
  );
}

const StartEndEdge: FC<EdgeProps<Edge<{ 
  startLabel?: string; 
  endLabel?: string; 
}>>> = ({
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
}) => {
  const [edgePath] = getBezierPath({
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

  // ดึงสีจาก style
  const backgroundColor = (style.stroke as string) || '#666';

  return (
    <>
      <BaseEdge 
        id={id}
        path={edgePath} 
        markerEnd={markerEnd}
        style={style}
      />
      <EdgeLabelRenderer>
        {/* Start Label */}
        {data?.startLabel && (
          <EdgeLabel
            transform={`translate(-50%, -50%) translate(${startLabelX}px,${startLabelY}px)`}
            label={data.startLabel}
            backgroundColor={backgroundColor}
          />
        )}
        
        {/* End Label */}
        {data?.endLabel && (
          <EdgeLabel
            transform={`translate(-50%, -50%) translate(${endLabelX}px,${endLabelY}px)`}
            label={data.endLabel}
            backgroundColor={backgroundColor}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default StartEndEdge;