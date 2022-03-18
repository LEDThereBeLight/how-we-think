import React from "react"

// const DropHandle = () => {

//   return (
//     <Handle
//       type="target"
//       position={Position.Left}
//       isValidConnection={connection => connection.source === "some-id"}
//       onConnect={params => console.log("handle onConnect", params)}
//       style={{ background: "#fff" }}
//     />
//   )
// }

export default function CaseNode(props) {
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
      }}
    >
      <div style={{ display: "flex" }}>
        <div>case</div>
        {/* <Handle type="target" position={Position.Top} /> */}
        <div>...</div>
        <div>of</div>
      </div>
      <div style={{ display: "flex" }}>
        {/* definition impl/output goes here */}
      </div>
    </div>
  )
}
