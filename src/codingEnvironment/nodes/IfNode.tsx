import React from "react"
import {
  Handle,
  NodeProps,
  Position,
  useStore,
  useStoreApi,
} from "react-flow-renderer"

interface IfData {
  line: number
}
export default function IfNode({ data }: NodeProps<IfData>) {
  return (
    <div
      className="if-node"
      style={{
        color: "white",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: "500px",
      }}
    >
      <div>If Node</div>
      <Handle hidden type="target" position={Position.Top} />
    </div>
  )
}
