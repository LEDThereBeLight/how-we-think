import React, { useCallback } from "react"
import { LINE_HEIGHT } from "../globals"
import { motion, LayoutGroup, Reorder, AnimatePresence } from "framer-motion"

const moveNodeToParent = (
  nodeId: string,
  parentId: string,
  targetId?: string
) => {
  // add edge { source: node, target: targetId ?? parent }
  // node.parent = parent
}

interface Props {
  parentId: string
  renderer: JSX.Element
}
export default function DropTarget(props: Props) {
  const flow = {}

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
    },
    [flow]
  )

  const [items, setItems] = React.useState([{ id: 1 }])

  return (
    <Reorder.Group
      axis="y"
      layoutId={props.parentId + "droptarget"}
      values={items}
      onReorder={setItems}
      style={{
        minHeight: LINE_HEIGHT,
        borderLeft: "10px solid aliceblue",
      }}
    >
      <AnimatePresence>
        {items.map(item => (
          <Reorder.Item
            layoutId={String(item.id)}
            drag
            key={item.id}
            value={item}
          >
            <motion.div onDragOver={onDragOver} onDrop={onDrop}>
              Item
            </motion.div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  )
}

/*
Call relayout anytime a node or edge changes

Draggable items:
  nodes
    ondragstart
      set data to node type

 // Need targetId if a node has multiple handles (targets)
 // node body sidebars (need handle with type="target", id=attr)
addNodeToParent(node, parent, targetId?) ->
  add edge { source: node, target: targetId ?? parent }
  node.parent = parent

insertBefore(node, parent, targetId?) ->
  for reversed(nextTarget <- targets from parent to end):
    if exists(edge{target: nextTarget}), remove
    addNodeToParent(previousSource, nextTarget)
  addNodeToParent(node, parent, targetId)

displaySlotBefore(node) ->
  # insert a virtual "blank" node before this node
  # probably just set a separate local state variable then reset after

Handle droptarget taking up "space"
  left sidebar expands down at least 1 line,
  if another node is added below, it should go to the
  line number below it instead

Validations:
  ****

Drop targets:
  ondrop
    case invalid: noop
    else: insertBefore(
            droppedNode,
            event.y >= midpoint ? next(targetNode) : targetNode,
            handle has id ? dropHandle.id : undefined)
  ondragover
    case invalid: show some indicator
    else: displaySlotBefore(
            event.y >= midpoint ? next(droptarget) : droptarget)



DraggableItem:
  once:
    Xondragstart
    ondragend
  continuous:
    ondrag

DropTarget:
  once:
    ondragenter
    ondragleave
    Xondrop
  continuous:
    ondragover
*/
