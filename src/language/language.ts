// Types
export type Expr = Var | Num | Constr | Ap | Let | Case | Fn | IfElse
export type Atom = Var | Num | Constr | ParenExpr
export type ParenExpr = Expr
export type Name = string
export type Var = { t: "var"; name: Name }
export type Num = { t: "num"; v: number }
export type Constr = { t: "constr"; tag: number; arity: number }
export type Ap = { t: "ap"; l: Expr; r: Expr }
export type Case = { t: "case"; expr: Expr; alts: Alt[] }
export type Fn = { t: "fn"; params: Let[]; body: Expr }
export type Let = { t: "let"; defns: Defn[]; body: Expr }
export type Alt = { t: "alt"; tag: number; vars: Name[]; expr: Expr }
export type Statement = Defn | Expr
export type Program = Statement[]
export type Defn = {
  t: "defn"
  name: Name
  params: Name[]
  body: Expr
}
// When is used for Cond and Case
// Defn is a pair of name and expr

export const Defn = ([name, params, body]: [Name, Name[], Expr]): Defn => ({
  t: "defn",
  name,
  params,
  body,
})
export const Alt = (tag: number, vars: Name[], expr: Expr): Alt => ({
  t: "alt",
  tag,
  vars,
  expr,
})
export const Let = (defns: Defn[], body: Expr): Let => ({
  t: "let",
  defns,
  body,
})
export const Fn = (params: Let[], body: Expr): Fn => ({
  t: "fn",
  params,
  body,
})
export const Case = (expr: Expr, alts: Alt[]): Case => ({
  t: "case",
  expr,
  alts,
})
export const Ap = (l: Expr, r: Expr): Ap => ({ t: "ap", l, r })
export const Constr = (tag: number, arity: number): Constr => ({
  t: "constr",
  tag,
  arity,
})
export const Var = (name: Name): Var => ({ t: "var", name })
export const Num = (v: number): Num => ({ t: "num", v })

export type IfElse = { t: "if"; test: Expr; conseq: Expr; alt: Expr }
export const IfElse = (test: Expr, conseq: Expr, alt: Expr): IfElse => ({
  t: "if",
  test,
  conseq,
  alt,
})
