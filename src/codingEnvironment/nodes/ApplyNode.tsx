import React from "react"

interface ApplyData {
  line: number
}
export default function ApplyNode(props) {
  return (
    <div
      className="apply-node"
      style={{
        border: '1px solid red',
        color: "white",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: "500px",
      }}
    >
      <div>Apply Node</div>
      {/* <Handle hidden type="target" position={Position.Top} /> */}
    </div>
  )
}
