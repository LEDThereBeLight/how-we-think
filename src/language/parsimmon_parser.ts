import { printExpr } from "./printer"
import P from "parsimmon"
import { Num, Defn, Var, Case, Alt, Let, Ap, Expr, Name } from "./language"

/*
length alist =
  match alist
    case [] -> 0
    case x:xs -> 1 + length xs

length alist =
  if alist is [] then 0
  else 1 + length tail alist

four x =
  double x = 2 * x
  double x + double x
*/

const NL = P.alt(P.string("\r\n"), P.oneOf("\r\n"))
const End = P.alt(NL, P.eof)
const _ = P.regexp(/[ ]*/)
const __ = P.regexp(/[ ]+/)
const Strings = (...ss: string[]) => ss.map(P.string)

const ApPrefix = (next: P.Parser<any>, suffix: P.Parser<any>) =>
  P.seqObj<{ e1; partial }>(["e1", next.trim(__)], ["partial", suffix]).map(
    ({ e1, partial }) => assembleOp(e1, partial)
  )

const PartialAp = (match: P.Parser<any>, previous: P.Parser<any>) =>
  P.seqObj<{ op; arg }>(["op", match.trim(_)], ["arg", previous]).map(
    ({ op, arg }) => FoundOp(op, arg)
  )

const Maybe = (...parsers: P.Parser<any>[]) => P.alt(...parsers, P.of(NoOp()))

const makeApChain = ([expr, ...exprs]) => exprs.reduce(Ap, expr)

const Str = (s: string) =>
  P.string(s)
    .trim(_)
    .desc("String (" + s + ")")

type NoOp = { t: "noop" }
export const NoOp = () => ({ t: "noop" })

type FoundOp = { t: "fop"; op: Name; arg: Expr }
export const FoundOp = (op: Name, arg: Expr) => ({ t: "fop", op, arg })

export type PartialExpr = NoOp | FoundOp
export const assembleOp = (e1: Expr, partial: PartialExpr): Expr =>
  partial.t === "noop" ? e1 : Ap(Ap(Var(partial.op), e1), partial.arg)

export const LANGUAGE = P.createLanguage<any>({
  Let: r =>
    P.seqObj<{ defns; body }>(
      [
        "defns",
        r.Defn.sepBy(P.regex(/[\s]*[,][\s]*/))
          .wrap(Str("let"), Str("in"))
          .desc("Defns"),
      ],
      ["body", r.Expr.desc("Body")]
    )
      .map(({ defns, body }) => Let(defns, body))
      .desc("Let"),
  //  Constr Int Int -- Constructor tag arity
  Constructor: () => P.fail("Constructor").desc("Constr"),

  Atom: r => P.alt(r.ParenExpr, r.Constructor, r.Variable, r.Num).desc("Atom"),

  // todo: filter out keywords?
  Identifier: () => P.regexp(/[a-z_][a-zA-Z0-9?_]*/).desc("Identifier"),

  Variable: r => r.Identifier.desc("Variable").map(Var),

  Num: r =>
    P.regexp(/\d+/)
      .desc("Number")
      .map(n => Num(parseInt(n))),

  ParenExpr: r => r.Expr.trim(_).wrap(Str("("), Str(")")).desc("Paren expr"),

  Fn: () => P.fail("fn"),

  Case: r =>
    P.seqObj<{ expr; alts }>(["expr", r.Expr.trim(_)], Str("do"), [
      "alts",
      r.Alt.sepBy(_),
    ])
      .wrap(Str("case"), Str("end"))
      .map(({ expr, alts }) => Case(expr, alts)),
  Alt: r =>
    P.seqObj<{ tag; vars; expr }>(
      ["tag", P.regexp(/\d+/).wrap(Str("<"), Str(">"))],
      ["vars", r.Variable.sepBy(_)],
      Str("->"),
      ["expr", r.Expr]
    ).map(({ tag, vars, expr }) => Alt(tag, vars, expr)),

  Expr: r => r.Let.or(r.Case).or(r.Fn).or(r.Expr1).or(r.If).desc("Expr"),
  Expr1: r => ApPrefix(r.Expr2, r.Expr1c).desc("Expr1"),
  Expr1c: r => Maybe(PartialAp(Str("or"), r.Expr1)).desc("Expr1c"),
  Expr2: r => ApPrefix(r.Expr3, r.Expr2c).desc("Expr2"),
  Expr2c: r => Maybe(PartialAp(Str("and"), r.Expr2)).desc("Expr2c"),
  Expr3: r => ApPrefix(r.Expr4, r.Expr3c).desc("Expr3"),
  Expr3c: r => Maybe(PartialAp(r.Relop, r.Expr3)).desc("Expr3c"),
  Relop: r =>
    P.alt(...Strings("<", "<=", "is", "isnt", ">=", ">")).desc("Relop"),
  Expr4: r => ApPrefix(r.Expr5, r.Expr4c).desc("Expr4"),
  Expr4c: r =>
    Maybe(PartialAp(Str("+"), r.Expr4), PartialAp(Str("-"), r.Expr5)).desc(
      "Expr4c"
    ),
  Expr5: r => ApPrefix(r.Expr6, r.Expr5c).desc("Expr5"),
  Expr5c: r =>
    Maybe(PartialAp(Str("*"), r.Expr5), PartialAp(Str("/"), r.Expr6)).desc(
      "Expr5c"
    ),
  Expr6: r =>
    r.Atom.atLeast(1)
      .desc("Atoms")
      // .map(makeApChain)
      .desc("Expr6 (Applications)"),

  Defn: r =>
    P.seqObj<{
      idents: any
      body: any
    }>(["idents", r.Identifier.atLeast(1)], Str("="), [
      "body",
      r.Expr.trim(_),
    ]).map(({ idents, body }) => Defn([idents[0], idents.slice(1), body])),
  Statement: r => P.alt(r.Defn, r.Expr),
  Program: r => r.Statement.trim(_).atLeast(1),

  If: r => Str('if')
})
// atom, identifier, application, variable, num, parenexpr, if, defn,
// expr

// Parse :: string -> AST
// Eval :: AST -> Value
// Render :: AST -> Block[]
