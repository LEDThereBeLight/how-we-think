import * as T from "./types"

export const DataTypeDefn = ({
  name,
  params,
  constrs,
}: {
  name: T.Name
  params: T.Name[]
  constrs: T.Constr[]
}): T.DataTypeDefn => ({
  t: "data",
  name,
  params,
  constrs,
})

export const Definition = ({
  name,
  params,
  body,
}: {
  name: T.Name
  params: { name: T.Name; type: T.Name }[]
  body: (T.ValueDefn | T.Expr)[]
}): T.Definition => ({
  t: "defn",
  name,
  params,
  body,
})
export const Parameter = ({ name, type }): T.Parameter => ({ name, type })
export const Alt = (tag: string, vars: T.Name[], expr: T.Expr): T.Alt => ({
  t: "alt",
  tag,
  vars,
  expr,
})
export const Let = (defns: T.Definition[], body: T.Expr): T.Let => ({
  t: "let",
  defns,
  body,
})
export const Fn = (params: T.Let[], body: T.Expr): T.Fn => ({
  t: "fn",
  params,
  body,
})
export const Case = (expr: T.Expr, alts: T.Alt[]): T.Case => ({
  t: "case",
  expr,
  alts,
})
export const Ap = (l: T.Expr, r: T.Expr): T.Ap => ({ t: "ap", l, r })
export const Constr = (
  tag: string,
  arity: number,
  fields: { name: string; type: string }[]
): T.Constr => ({
  t: "constr",
  tag,
  arity,
  fields
})
// export const ConstrName = (name: string, params: T.Name[] = []) => ({
//   t: "constr",
//   name,
//   params: [],
// })
export const Var = (name: T.Name): T.Var => ({ t: "var", name })
export const Num = (v: number): T.Num => ({ t: "num", v })

export const IfElse = (
  test: T.Expr,
  conseq: T.Expr,
  alt: T.Expr
): T.IfElse => ({
  t: "if",
  test,
  conseq,
  alt,
})
