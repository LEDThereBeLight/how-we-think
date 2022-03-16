import React from "react"
import {
  Handle,
  NodeProps,
  Position,
  useStore,
  useStoreApi,
} from "react-flow-renderer"

const DropHandle = () => {
  const s = useStore()
  const ss = useStoreApi()

  return (
    <Handle
      type="target"
      position={Position.Left}
      isValidConnection={connection => connection.source === "some-id"}
      onConnect={params => console.log("handle onConnect", params)}
      style={{ background: "#fff" }}
    />
  )
}

export default function CaseNode({ data }: NodeProps) {
  return (
    <div
      className="case-node"
      style={{
        border: "1px solid #eee",
        padding: "5px",
        borderRadius: "5px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        minHeight: "100px",
      }}
    >
      <div style={{ display: "flex" }}>
        <div>case</div>
        <Handle type="target" position={Position.Top} />
        <div>...</div>
        <div>of</div>
      </div>
      <div style={{ display: "flex" }}>
        {/* definition impl/output goes here */}
      </div>
    </div>
  )
}
