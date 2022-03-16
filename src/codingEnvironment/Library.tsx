import React from "react"

export default function Library() {
  const onDragStart = React.useCallback((e, nodeType) => {
    e.dataTransfer.setData("application/reactflow", nodeType)
    e.dataTransfer.effectAllowed = "move"
  }, [])

  const makeNode = (className: string, nodeType: string, label: string) => (
    <div
      className={`dndnode ${className}`}
      onDragStart={e => onDragStart(e, nodeType)}
      draggable
    >
      {label}
    </div>
  )

  const nodes = [
    ["define", "New-Define", "Define Node"],
    ["case", "New-Case", "Case Node"],
    ["if", "New-If", "If Node"],
    ["apply", "New-Apply", "Apply Node"],
  ].map(([x, y, z]) => makeNode(x, y, z))

  return (
    <aside
      style={{
        display: "flex",
        borderRight: "1px solid royalblue",
        height: "100%",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {nodes}
    </aside>
  )
}
