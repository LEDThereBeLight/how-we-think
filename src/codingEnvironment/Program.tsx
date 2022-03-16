import React, { useCallback, useMemo, useRef, useState } from "react"
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  Background,
  Node,
  Edge,
  FitViewOptions,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  OnConnect,
  PanOnScrollMode,
} from "react-flow-renderer"
import NodeTypes from './nodes'

/*
[text input]
(Node)
<button / dropdown v>

Tree of item ... =
  Leaf      OR
  Branch of
    value item          AND
    left (Tree of item) AND
    right (Tree of item)

    name      type param   add more type params
1. [List] of (AnyType v) <...> =
    [Nothing] OR
    [Pair] of
      [head] (AnyType v) <...> AND
      [tail] (List of AnyType v) <...>
2. [length] ((alist) of (List of AnyType v)) <...> =
3.   case <alist v> <... if more args or prev value defs> of <+>
4.     (Nothing) then
5.       (0)
6.     (Pair head [x] tail [xs]) then
7.       (+) (1) (length (tail))

length_gt_2 alist =
  case alist of
    Nothing then
      False
    Pair head x tail xs then
      case xs of
        Nothing then
          False
        Pair head y tail ys then
          True

LineData {
  id: id
  number: number
}

DefineWordData {
  id: id
  name: string
  params: {name: string, type: Type}[]
  body: Expr (define this)
}

DefineDataData {
  id: id
  name: string
  params: (SumType | ProductType)[]
  body: SumType | ProductType
}
SumType = {
  id: id
  alts: ProductType[]
}
ProductType = {
  id: id
  name: string
  fields: {name: string, type: id, params: Type[] }[]
}

// Case only allows matching one variable (at first)
CaseData {
  id: id
  input: Expr
  outputs: Alt[]
}
AltData {
  id: id
  input: TypeId
  vars
  output: Expr
}

// names of sum/product types must be different
// from main define name
// AnyType type must be built in
// anyValue value must be built in

Graph:
  Nodes:
    Line 1
      id: Line-1
      number: 1
    ..Line 7
    Define
      id: Define-Data-List
      name: "List"
      params: ["Data-AnyType"]
      body: SumType(
        ProductType{name: "Nothing", fields: []},
        ProductType{name: "Pair", fields: [
          {name: "head", type: "Data-AnyType", params: [] (the options are other available types, but only generic types are the ones given as arguments)},
          {name: "tail", type: "Data-List", params: ["Data-AnyType"]}
        ]} // on run, must define the Data-List type first, so
        // it can be referenced recursively
      )
    Define
      id: Define-Word-length
      name: "length"
      params: [
        {
          name: "alist",
          type: {
            id: "Data-List",
            params: [{ id: "Data-AnyType" }]
          }
        }
      ]
    Case
      id: Case-1
      input: param "alist"
      alts: [of1, of2]
  Edges:
    All nodes have a "target" handle for each attr
    when adding a node, the node becomes a child
      AND sets an edge to set that attr

  the full program is walking down the lines and

  Parent/Child:
    all nodes children of lines

Functionality:
*/



const defaultNodes: Node[] = [
  {
    id: "line-1",
    type: "Line",
    data: { line: 1 },
    position: { x: 0, y: 0 },
  },
  {
    id: "line-2",
    type: "Line",
    data: { line: 2 },
    position: { x: 0, y: 60 },
  },
  {
    id: "line-3",
    type: "Line",
    data: { line: 3 },
    position: { x: 0, y: 120 },
  },
  {
    id: "line-4",
    type: "Line",
    data: { line: 4 },
    position: { x: 0, y: 180 },
  },
  {
    id: "line-5",
    type: "Line",
    data: { line: 5 },
    position: { x: 0, y: 240 },
  },

  {
    id: "1",
    type: "Define",
    data: { label: "Define Node" },
    position: { x: 30, y: 0 },
  },
  // {
  //   id: "2",
  //   type: "Case",
  //   data: { label: "Case Node" },
  //   position: { x: 30, y: 100 },
  // },
  // {
  //   id: "50",
  //   type: "input",
  //   data: { label: "Input Node" },
  //   position: { x: 30, y: 150 },
  // },
  // {
  //   id: "51",
  //   // you can also pass a React component as a label
  //   data: { label: <div>Default Node</div> },
  //   position: { x: 30, y: 200 },
  // },
  // {
  //   id: "52",
  //   type: "output",
  //   data: { label: "Output Node" },
  //   position: { x: 30, y: 250 },
  // },
]

const defaultEdges: Edge[] = [
  // { id: "e1-2", source: "50", target: "51" },
  // { id: "e2-3", source: "51", target: "52", animated: true },
]

const snapGrid = [Number.MAX_SAFE_INTEGER, 60] as [number, number]

let id = 0
export const getId = () => `dndnode_${id++}`

export default function Program() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges)
  console.log("nodes", nodes)

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)

  const nodeTypes = useMemo(() => NodeTypes, [])

  const onConnect: OnConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    []
  )

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop: React.DragEventHandler<HTMLDivElement> = useCallback(
    e => {
      e.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const typeInfo = e.dataTransfer.getData("application/reactflow")

      if (!typeInfo) return
      const type = typeInfo.split("New-")?.[1] ?? typeInfo

      setNodes(nds =>
        nds.concat({
          id: getId(),
          type,
          position: reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top,
          }),
          data: { label: `${type} node` },
        })
      )
    },
    [reactFlowInstance]
  )

  return (
    <main
      style={{ flexGrow: "1", height: "100%" }}
      className="reactflow-wrapper"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        snapToGrid
        snapGrid={snapGrid}
        nodes={nodes}
        edges={edges}
        onNodesChange={xs => {
          console.log("nodes changed", xs)
          onNodesChange(xs)
        }}
        onEdgesChange={xs => {
          console.log("edges changed", xs)
          onEdgesChange(xs)
        }}
        onConnect={xs => {
          console.log("connection", xs)
          onConnect(xs)
        }}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        panOnScroll
        panOnScrollMode={PanOnScrollMode.Vertical}
        defaultZoom={1}
        panOnDrag={false}
        minZoom={1}
        defaultPosition={[10, 10]}
      >
        <MiniMap />
        <Background
          gap={20}
          style={{ backgroundColor: "#323232", color: "white" }}
        />
      </ReactFlow>
    </main>
  )
}
