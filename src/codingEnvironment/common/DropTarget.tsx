import React from 'react'

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
