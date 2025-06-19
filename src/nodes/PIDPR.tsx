{
  /* PIDPR.tsx */
}

import React, { memo } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  type NodeProps,
} from "@xyflow/react";

interface TestNodeData {
  label?: string;
  value?: string;
}

const DEFAULT_HANDLE_STYLE = {
  width: 16,
  height: 16,
  background: "#ffffff",
  border: "1px solid #6B7280",
  borderRadius: "50%",
} as React.CSSProperties;

const TARGET_HANDLE_STYLE = {
  width: 16,
  height: 16,
  background: "#000000",
  border: "1px solid #6B7280",
  borderRadius: "50%",
} as React.CSSProperties;

export default memo(({ data, isConnectable, id }: NodeProps<TestNodeData>) => {
  // ฟังก์ชันตรวจสอบการเชื่อมต่อของแต่ละ handle
  const getConnectionCount = (handleId: string) => {
    const connections = useNodeConnections({
      handleId,
      handleType: "target",
      nodeId: id,
    });
    return connections.length;
  };

  return (
    <div className="w-[300px] h-[250px] flex bg-white border-2 border-purple-600 rounded-lg items-center justify-center text-center relative">
      <div className="">
        <div className="font-bold text-black text-xl">PIDP_R</div>
      </div>

      {/* IN1 Handle */}
      <Handle
        type="target"
        id="in1"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "70px",
          left: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("in1") < 1}
      />
      {/* IN1 Label */}
      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "61px", // จัดให้อยู่ระดับเดียวกับ handle (70px - 4px เพื่อให้ตรงกลาง)
          left: "20px",
        }}
      >
        IN1
      </div>

      {/* IN2 Handle */}
      <Handle
        type="target"
        id="in2"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "95px",
          left: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("in2") < 1}
      />
      {/* IN2 Label */}
      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "85px", // จัดให้อยู่ระดับเดียวกับ handle
          left: "20px",
        }}
      >
        IN2
      </div>

      {/* TC Handle */}
      <Handle
        type="target"
        id="tc"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "120px",
          left: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("tc") < 1}
      />
      {/* TC Label */}
      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "111px", // จัดให้อยู่ระดับเดียวกับ handle
          left: "20px",
        }}
      >
        TC
      </div>

      {/* TV Handle */}
      <Handle
        type="target"
        id="tv"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "145px",
          left: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("tv") < 1}
      />
      {/* TV Label */}
      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "136px", // จัดให้อยู่ระดับเดียวกับ handle
          left: "20px",
        }}
      >
        TV
      </div>

      {/* FEED Handle */}
      <Handle
        type="target"
        id="feed"
        position={Position.Left}
        style={{
          ...TARGET_HANDLE_STYLE,
          top: "170px",
          left: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("feed") < 1}
      />
      {/* FEED Label */}
      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "160px", // จัดให้อยู่ระดับเดียวกับ handle
          left: "20px",
        }}
      >
        FEED
      </div>

      {/* RE Handle */}
      <Handle
        type="source"
        id="re"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "70px",
          right: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("re") < 1}
      />

      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "61px",
          right: "20px",
        }}
      >
        RE
      </div>

      <Handle
        type="source"
        id="eps"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "95px",
          right: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("eps") < 1}
      />

      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "85px",
          right: "20px",
        }}
      >
        EPS
      </div>

      <Handle
        type="source"
        id="ula"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "120px",
          right: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("ula") < 1}
      />

      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "111px",
          right: "20px",
        }}
      >
        ULA
      </div>

      <Handle
        type="source"
        id="lla"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "145px",
          right: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("lla") < 1}
      />

      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "136px",
          right: "20px",
        }}
      >
        LLA
      </div>

      <Handle
        type="source"
        id="err"
        position={Position.Right}
        style={{
          ...DEFAULT_HANDLE_STYLE,
          top: "170px",
          right: "-1px",
        }}
        isConnectable={isConnectable && getConnectionCount("err") < 1}
      />

      <div
        className="absolute text-sm font-medium text-gray-700"
        style={{
          top: "160px",
          right: "20px",
        }}
      >
        ERR
      </div>

      {/* KP Handle */}
      <Handle
        type="target"
        id="kp"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "85px",
        }}
        isConnectable={isConnectable && getConnectionCount("kp") < 1}
      >
        <div className="text-sm font-medium text-gray-700 mt-4">KP</div>
      </Handle>

      <Handle
        type="target"
        id="ti"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "115px",
        }}
        isConnectable={isConnectable && getConnectionCount("ti") < 1}
      >
        <div className="text-sm font-medium text-gray-700 mt-4">TI</div>
      </Handle>

      <Handle
        type="target"
        id="td"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
        }}
        isConnectable={isConnectable && getConnectionCount("td") < 1}
      >
        <div className="text-sm font-medium text-gray-700 mt-4">TD</div>
      </Handle>
      <Handle
        type="target"
        id="n"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "182px",
        }}
        isConnectable={isConnectable && getConnectionCount("n") < 1}
      >
        <div className="text-sm font-medium text-gray-700 mt-4">N</div>
      </Handle>

      <Handle
        type="target"
        id="ul"
        position={Position.Top}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "215px",
        }}
        isConnectable={isConnectable && getConnectionCount("ul") < 1}
      >
        <div className="text-sm font-medium text-gray-700 mt-4">UL</div>
      </Handle>

      {/* DI Handle */}
      <Handle
        type="target"
        id="di"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "45px",
          
        }}
        isConnectable={isConnectable && getConnectionCount("di") < 1}
      >
        
      </Handle>

      <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "38px",
        }}
      >
        DI
      </div>

      <Handle
        type="target"
        id="per"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "85px",
        }}
        isConnectable={isConnectable && getConnectionCount("per") < 1}
      >
        
      </Handle>

      <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "73px",
        }}
      >
        PER
      </div>

      <Handle
        type="target"
        id="iis"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "128px",
        }}
        isConnectable={isConnectable && getConnectionCount("iis") < 1}
      >
        
      </Handle>

        <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "120px",
        }}
      >
        IIS
      </div>

      <Handle
        type="target"
        id="ids"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "175px",
        }}
        isConnectable={isConnectable && getConnectionCount("ids") < 1}
      >
       
      </Handle>

         <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "165px",
        }}
      >
        IDS
      </div>
      
      <Handle
        type="target"
        id="der"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "218px",
        }}
        isConnectable={isConnectable && getConnectionCount("der") < 1}
      >
        
      </Handle>

        <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "205px",
        }}
      >
        DER
      </div>

      <Handle
        type="target"
        id="ll"
        position={Position.Bottom}
        style={{
          ...TARGET_HANDLE_STYLE,
          left: "265px",
        }}
        isConnectable={isConnectable && getConnectionCount("ll") < 1}
      >
        
      </Handle>

      <div 
        className="absolute text-sm font-medium text-gray-700"
        style={{
          bottom: "15px",
          left: "258px",
        }}
      >
        LL
      </div>
    </div>
  );
});



