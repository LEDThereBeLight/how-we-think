import React, { useCallback, useRef, useState } from "react"
import { Handle, NodeProps, Position, useReactFlow } from "react-flow-renderer"
import { getId } from "../Program"
import Dropdown from "../common/Dropdown"
import TextInput from "../common/TextInput"
import { Space } from "antd"

export default function DefineNode({ data, id, xPos, yPos }: NodeProps) {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const reactFlowInstance = useReactFlow()

  const onChange = useCallback(evt => {
    console.log(evt.target.value)
  }, [])

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()

      const typeInfo = e.dataTransfer.getData("application/reactflow")
      if (!typeInfo) return

      if (typeInfo.includes("New-")) {
        const type = typeInfo.split("New-")[1]
        // new node, create and add it
        // add edge?
        reactFlowInstance.setNodes(nds =>
          nds.concat({
            id: getId(),
            type,
            parentNode: id,
            position: {
              x: 12,
              y: 70,
            },
            data: { label: `${type} node` },
            expandParent: true,
          })
        )
      }

      // If existing node, move it
    },
    [reactFlowInstance]
  )

  const onDragEnter = e => {
    e.preventDefault()
    console.log("dragenter", e.dataTransfer.getData("application/reactflow"))
  }

  const [word, setWord] = useState("")

  return (
    <div
      style={{
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Space
        align="baseline"
        style={{
          padding: "0.8rem",
          border: "1px solid #eee",
          backgroundColor: "white",
        }}
      >
        <Dropdown
          defaultValue={"word"}
          options={[
            { label: "word", value: "word" },
            { label: "data", value: "data" },
          ]}
        />
        <TextInput onChange={setWord} value={word} />
        <span>...</span>
        <span>=</span>
      </Space>
      <div
        style={{
          borderLeft: "10px solid aliceblue",
          width: "100%",
          flexGrow: 1,
          minHeight: "100px",
        }}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Handle type="target" id="definition" position={Position.Left} hidden />
      </div>
    </div>
  )
}
