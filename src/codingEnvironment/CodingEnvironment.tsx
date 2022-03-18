import React, { useCallback, useState } from "react"
import ReorderableList from "./common/Reorder"
import Program from "./program/Program"
import Library from "./Library"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

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
      <Library />
      <Program />
    </div>
  )
}
