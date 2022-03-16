import React from "react"
import {
  Handle,
  NodeProps,
  Position,
  useStore,
  useStoreApi,
} from "react-flow-renderer"

const printLineNumber = (n: number) => {
  if (n < 10) return "0" + String(n)
  return String(n)
}

interface LineData {
  line: number
}
export default function LineNode({ data }: NodeProps<LineData>) {
  return (
    <div
      className="line-node nodrag"
      style={{
        color: 'white',
        cursor: 'default',
        display: "flex",
        flexDirection: "column",
        height: "60px",
        width: '500px',
      }}
    >
      <div>{printLineNumber(data.line)}</div>
      <Handle hidden type="target" position={Position.Top} />
    </div>
  )
}
