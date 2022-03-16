import React, { useCallback, useState } from "react"
import Program from "./Program"
import Library from "./Library"
import { ReactFlowProvider } from "react-flow-renderer"

export default function CodingEnvironment() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
      className="dndflow"
    >
      <ReactFlowProvider>
        <Library />
        <Program />
      </ReactFlowProvider>
    </div>
  )
}
