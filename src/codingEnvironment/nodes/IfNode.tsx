import React from "react"

interface IfData {
  line: number
}
export default function IfNode(props) {
  return (
    <div
      className="if-node"
      style={{
        border: "1px solid purple",
        color: "white",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: "500px",
      }}
    >
      <div>If Node</div>
      {/* <Handle hidden type="target" position={Position.Top} /> */}
    </div>
  )
}
