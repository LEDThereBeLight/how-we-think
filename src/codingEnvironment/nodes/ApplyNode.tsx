import React from "react"
import {
  Handle,
  NodeProps,
  Position,
  useStore,
  useStoreApi,
} from "react-flow-renderer"

interface ApplyData {
  line: number
}
export default function ApplyNode({ data }: NodeProps<ApplyData>) {
  return (
    <div
      className="apply-node"
      style={{
        color: "white",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: "500px",
      }}
    >
      <div>Apply Node</div>
      <Handle hidden type="target" position={Position.Top} />
    </div>
  )
}
