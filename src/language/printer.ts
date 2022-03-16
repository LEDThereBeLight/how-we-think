import { Expr, Defn, Program } from "./language"

export const printPrgm = (prgm: Program): string => {
  return prgm
    .map(x => (x.t === "defn" ? printDefn(x) : printExpr(x)))
    .join("\n")
}
export const printExpr = (e: Expr): string => {
  switch (e.t) {
    case "num":
      return String(e.v)
    case "var":
      return e.name
    case "ap":
      return printAtom(e.l) + " " + printAtom(e.r)
    case "constr":
      return `Pack{${e.tag}, ${e.arity}}`
    case "let":
      return `${e.defns.map(printDefn).join(", ")} in ${printExpr(e.body)}`
    case "fn":
      return `${e.params.map(printExpr).join(", ")} -> ${printExpr(e.body)}`
    case "case":
      return `\
case ${printExpr(e.expr)} do
  ${e.alts.map(
    alt =>
      "<" + alt.tag + "> -> " + alt.vars.join(" ") + " " + printExpr(alt.expr)
  )}`
    default:
      return String(e)
  }
}

// definitions
let bindersOf = defns => defns.map(([name, rhs]) => name)
let rhssOf = defns => defns.map(([name, rhs]) => rhs)

const isAtomicExpr = (expr: Expr): boolean => {
  switch (expr.t) {
    case "var":
      return true
    case "num":
      return true
    default:
      return false
  }
}
export const printDefn = (d: Defn) => {}
export const printAtom = (e: Expr): string => {
  if (isAtomicExpr(e)) return printExpr(e)
  return `(${printExpr(e)})`
}
