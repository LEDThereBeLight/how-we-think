import {Program} from "../../language/syntax/types"
import {
  Alt,
  Ap,
  Case,
  Constr,
  DataTypeDefn,
  Definition,
  Num,
  Parameter,
  Var,
} from "./../../language/syntax/constructors"
export const initialCards = [
  {
    id: 1,
    text: "Write a cool JS library",
    children: [],
  },
  {
    id: 2,
    text: "Make it generic enough",
  },
  {
    id: 3,
    text: "Write README",
  },
  {
    id: 4,
    text: "Create some examples",
  },
  {
    id: 5,
    text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
  },
  {
    id: 6,
    text: "???",
  },
  {
    id: 7,
    text: "PROFIT",
  },
]

export const lengthProgram: Program = [
  // DataTypeDefn({
  //   name: "List",
  //   params: ["AnyType"],
  //   constrs: [
  //     Constr("Nothing", 0, []),
  //     Constr("Pair", 2, [
  //       { name: "head", type: "AnyType" },
  //       { name: "tail", type: "List" },
  //     ]),
  //   ],
  // }),

  Definition({
    name: "length",
    params: [Parameter({ name: "alist", type: "List-Id" })],
    body: [
      Case(Var("alist"), [
        Alt("Nothing-Id", [], Num(0)),
        Alt(
          "Pair-Id",
          ["x", "xs"],
          Ap(Ap(Var("+"), Num(1)), Ap(Var("length"), Var("xs")))
        ),
      ]),
    ],
  }),
]
