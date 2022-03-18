import {
  motion,
  isMotionValue,
  useMotionValue,
  useTransform,
} from "framer-motion"
import humanId from "human-id"
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import NodeTypes from "../nodes"
import DefineNode from "../nodes/DefineNode"
import { Program as ProgramT } from "../../language/syntax/types"
import { lengthProgram } from "./demoData"
import {inspect} from "util"

const programToLines = (program: ProgramT): any[] => {
  return program.map(x => inspect(x))
}

export default function Program() {
  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const [lines, setLines] = useState(programToLines(lengthProgram))

  const order = []
  const isReordering = useRef(false)

  const registerItem = (value, layout) => {
    if (layout && order.findIndex(entry => value === entry.value) === -1) {
      order.push({ value, layout: layout["y"] })
      order.sort(compareMin)
    }
  }

  useEffect(() => {
    isReordering.current = false
  })

  const onReorder = setLines
  const values = lines

  const updateOrder = (id, offset, velocity) => {
    if (isReordering.current) return

    const newOrder = checkReorder(order, id, offset, velocity)
    if (order !== newOrder) {
      isReordering.current = true

      onReorder(
        newOrder
          .map(item => item.value)
          .filter(value => values.indexOf(value) !== -1)
      )
    }
  }

  return (
    <main
      style={{
        flexGrow: "1",
        height: "100%",
        backgroundColor: "rgb(205 209 194)",
      }}
      className="reactflow-wrapper reorderable-program"
    >
      <motion.ul>
        {lines.map((card, index) => (
          <Card
            key={card}
            index={index}
            value={card}
            text={card}
            updateOrder={updateOrder}
            registerItem={registerItem}
          />
        ))}
      </motion.ul>
      {/* {Object.values(NodeTypes).map(n =>
        React.createElement(n, { id: humanId() })
      )} */}
    </main>
  )
}

const Card: FC<any> = ({
  value,
  text,
  updateOrder,
  registerItem,
  children,
}) => {
  const ref = useRef<HTMLLIElement>(null)
  const layout = useRef<any>(null)
  useEffect(() => {
    registerItem(value, layout.current!)
  }, [registerItem, updateOrder])

  const point = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) =>
    latestX || latestY ? 1 : "unset"
  )

  return (
    <motion.li
      ref={ref}
      drag
      layout
      dragSnapToOrigin
      style={{
        x: point.x,
        y: point.y,
        zIndex,
        display: "flex",
        flexDirection: "column",
      }}
      onLayoutMeasure={measured => {
        layout.current = measured
      }}
      onDrag={(event, gesturePoint) => {
        const { velocity } = gesturePoint
        velocity.y && updateOrder(value, point.y.get(), velocity.y)
      }}
    >
      <div>{text}</div>
      {value.children && (
        <motion.div
          style={{
            alignSelf: "start",
            width: "20px",
            height: "60px",
            backgroundColor: "royalblue",
          }}
        ></motion.div>
      )}
    </motion.li>
  )
}

function compareMin<V>(a: any, b: any) {
  return a.layout.min - b.layout.min
}

function checkReorder<T>(
  order: any[],
  value: T,
  offset: number,
  velocity: number
): any[] {
  if (!velocity) return order

  const index = order.findIndex(item => item.value === value)

  if (index === -1) return order

  const nextOffset = velocity > 0 ? 1 : -1
  const nextItem = order[index + nextOffset]

  if (!nextItem) return order

  const item = order[index]
  const mix = (from, to, progress) => -progress * from + progress * to + from
  const nextItemCenter = mix(nextItem.layout.min, nextItem.layout.max, 0.5)

  if (
    (nextOffset === 1 && item.layout.max + offset > nextItemCenter) ||
    (nextOffset === -1 && item.layout.min + offset < nextItemCenter)
  ) {
    return moveItem(order, index, index + nextOffset)
  }

  return order
}

function moveItem<T>([...arr]: T[], fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex

  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex

    const [item] = arr.splice(fromIndex, 1)
    arr.splice(endIndex, 0, item)
  }

  return arr
}

export function removeItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item)
  index > -1 && arr.splice(index, 1)
}
