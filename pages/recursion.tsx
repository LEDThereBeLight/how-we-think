import { styled } from "@stitches/react"
import { range, update } from "ramda"
import React, { useCallback, useRef, useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { BlockTypes } from "../src/components/blocks/blocks"

const Panels = styled("section", {
  display: "flex",
  height: "100vh",
  margin: "0 auto",
})

const Panel = {
  Left: styled("aside", {
    backgroundColor: "rgb(187, 183, 174)",
    width: "130px",
    margin: "50px 0",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  }),
  Right: styled("main", {
    width: 400,
    backgroundColor: "rgb(209, 205, 194)",
    height: "100%",
  }),
}

/*
case x, y of
  0, 1 ->
  0, _ ->
end

Product type, sum type
List a = Nothing | Pair a (List a)

Tree a = Leaf | Branch (Tree a) (Tree a)

Color = Red | Green | Blue

*/

const Line = ({ index, line, block }) => {
  // name: "line"
  // type: "line"
  // number: number
  // accepts: string[]
  // children: Block[]
  return (
    <div
      style={{
        height: "40px",
        width: "100%",
      }}
    >
      {index}
      {block}
    </div>
  )
}

type Program = { index: number; block: Block | undefined }[]

const InstructionList = ({ program }: { program: Program }) => {
  const numberOfLines =
    program.reduce((acc, x) => (x.index > acc ? x.index : acc), 0) + 1
  const programMap = program.reduce(
    (acc, curr) =>
      (acc[curr.index] = { line: makeLine(curr.index), block: curr.block }),
    {}
  )
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
      }}
    >
      {range(1, numberOfLines + 1).map(index => (
        <Line
          line={programMap[index]?.line}
          block={programMap[index]?.block}
          index={index}
          key={index}
        />
      ))}
    </div>
  )
}

type Item = {
  index: number
}
const Block = ({ text, index, moveItem }) => {
  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // useDrop - the list item is also a drop area
  const [spec, dropRef] = useDrop({
    accept: "item",
    hover: (item: Item, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  // Join the 2 refs together into one (both draggable and can be dropped on)
  const ref = useRef<HTMLDivElement | null>(null)
  const dragDropRef = dragRef(dropRef(ref))

  // Make items being dragged transparent, so it's easier to see where we drop them
  const opacity = isDragging ? 0 : 1

  // if (isDragging)
  return (
    <div
      ref={dragDropRef as any}
      style={{
        opacity,
      }}
    >
      {text}
    </div>
  )
  // return <MinimalBlock ref={dragDropRef as any} text={text} color="tomato" />
}

interface BlockProps {
  name: string
  type: string
  isDropped: boolean
}
const MinimalBlock = ({ name, type, isDropped }) => {
  const color = "tomato"
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  )

  return (
    <div
      ref={drag}
      role="Block"
      style={{
        userSelect: "none",
        width: "fit-content",
        padding: "4px 8px",
        backgroundColor: color,
        borderBottom: "4px solid #333",
        borderRadius: "4px",
        marginBottom: "8px",
      }}
    >
      {name}
    </div>
  )
}
interface Block {
  name: string
  type: string
  accepts: string[]
  children: Block[]
}
interface Line {
  name: "line"
  type: "line"
  index: number
  accepts: string[]
  children: Block[]
}
const exprs = [BlockTypes.CASE, BlockTypes.WHEN]
const blockOptions: Block[] = [
  { name: "word", type: BlockTypes.DEFINE_WORD, accepts: exprs, children: [] },
  { name: "Thing", type: BlockTypes.DEFINE_THING, accepts: [], children: [] },
  { name: "case", type: BlockTypes.CASE, accepts: exprs, children: [] },
  { name: "when", type: BlockTypes.WHEN, accepts: exprs, children: [] },
]

interface BOProps {
  name: string
  type: string
}
const BlockOption = React.memo(function BlockOption({ name, type }: BOProps) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  )

  return (
    <div ref={drag} role="Box" style={{ opacity }}>
      {name}
    </div>
  )
})

const makeLine = (index: number, children: any[] = []) => ({
  name: "line",
  type: "line",
  accepts: [BlockTypes.DEFINE_WORD, BlockTypes.DEFINE_THING],
  children: [],
  index,
})

export default function Demo() {
  // function isDropped(boxName: string) {
  //   return droppedBoxNames.indexOf(boxName) > -1
  // }

  const handleDrop = useCallback((index: number, item: { name: string }) => {
    const { name } = item

    // const movePetListItem = useCallback(
    //   (dragIndex, hoverIndex) => {
    //     const dragItem = pets[dragIndex]
    //     const hoverItem = pets[hoverIndex]
    //     // Swap places of dragItem and hoverItem in the pets array
    //     setPets(pets => {
    //       const updatedPets = [...pets]
    //       updatedPets[dragIndex] = hoverItem
    //       updatedPets[hoverIndex] = dragItem
    //       return updatedPets
    //     })
    //   },
    //   [pets]
    // )

    // add new item to children
    // move all children up

    // setDroppedBoxNames(
    //   update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
    // )
    // setDustbins(
    //   update(dustbins, {
    //     [index]: {
    //       lastDroppedItem: {
    //         $set: item,
    //       },
    //     },
    //   })
    // )
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Panels>
        <Panel.Left>
          {blockOptions.map(({ name, type }, index) => (
            <BlockOption name={name} type={type} key={index} />
          ))}
        </Panel.Left>
        <Panel.Right>
          <InstructionList program={[]} />
        </Panel.Right>
      </Panels>
    </DndProvider>
  )
}
