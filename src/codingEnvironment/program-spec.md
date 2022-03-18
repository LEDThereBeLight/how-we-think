/\*
[text input]
(Node)
<button / dropdown v>

Tree of item ... =
Leaf OR
Branch of
value item AND
left (Tree of item) AND
right (Tree of item)

    name      type param   add more type params

1.  [List] of (AnyType v) <...> =
    [Nothing] OR
    [Pair] of
    [head] (AnyType v) <...> AND
    [tail] (List of AnyType v) <...>

2.  [length] ((alist) of (List of AnyType v)) <...> =
3.  case <alist v> <... if more args or prev value defs> of <+>
4.      (Nothing) then
5.        (0)
6.      (Pair head [x] tail [xs]) then
7.        (+) (1) (length (tail))

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
\*/
