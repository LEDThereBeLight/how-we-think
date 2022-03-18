// Types
type DataTypeDefn = {
  t: "data"
  name: Name
  params: string[]
  constrs: Constr[]
}

type Expr = Var | Num | Constr | Ap | Let | Case | Fn | IfElse
type Atom = Var | Num | Constr | ParenExpr
type ParenExpr = Expr
type Name = string
type Var = { t: "var"; name: Name }
type Num = { t: "num"; v: number }
type Constr = {
  t: "constr"
  tag: string
  arity: number
  fields: { name: string; type: string }[]
}
type Ap = { t: "ap"; l: Expr; r: Expr }
type Case = { t: "case"; expr: Expr; alts: Alt[] }
type Fn = { t: "fn"; params: Let[]; body: Expr }
type Let = { t: "let"; defns: ValueDefn[]; body: Expr }
type Alt = { t: "alt"; tag: string; vars: Name[]; expr: Expr }
type Statement = DataTypeDefn | ValueDefn | Expr
type Program = Statement[]
type ValueDefn = {
  t: "defn"
  name: Name
  params: Parameter[]
  body: (ValueDefn | Expr)[]
}
type Parameter = { name: Name; type: Name }

type IfElse = { t: "if"; test: Expr; conseq: Expr; alt: Expr }

export type {
  Expr,
  ValueDefn as Definition,
  DataTypeDefn,
  Program,
  Statement,
  Case,
  Alt,
  Ap,
  Constr,
  Var,
  Num,
  Name,
  Let,
  Fn,
  IfElse,
  Parameter,
  ValueDefn,
}

// When is used for Cond and Case
// Defn is a pair of name and expr
