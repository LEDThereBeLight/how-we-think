import React from "react"

const printLineNumber = (n: number) => {
  if (n < 10) return "0" + String(n)
  return String(n)
}

interface LineData {
  line: number
}
export default function LineNode(props) {
  return (
    <div
      className="line-node nodrag"
      style={{
        border: '1px solid green',
        color: 'white',
        cursor: 'default',
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: '500px',
      }}
    >
      <div>{printLineNumber(props.line)}</div>
      {/* <Handle hidden type="target" position={Position.Top} /> */}
    </div>
  )
}
