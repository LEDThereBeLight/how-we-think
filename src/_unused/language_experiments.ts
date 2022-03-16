// Pack{tag, arity}
// tag is the id for the constructor
// arity is the number of args it takes
// Color = Red | Green | Blue
// Red   = Pack{1, 0}
// Green = Pack{2, 0}
// Blue  = Pack{3, 0}

// Tree a = Leaf a | Branch (Tree a) (Tree a)
// Leaf = Pack{1, 1}
// Branch = Pack{2, 2}
// Branch (Leaf 3) (Leaf 4) == Pack{2, 2} (Pack{1, 1} 3) (Pack{1, 1} 4)

/*
x + y is...
Ap(
  Ap(
      Var("+"),
      Var("x")
  ),
  Var("y")
)
*/

/*
main = double 21 ;
double x = x+x
[
  ("main", [], (Ap (Var "double") (Num 21))),
  ("double", ["x"], (Ap (Ap (Var "+") (Var "x")) (Var "x")))
]
*/

let I = x => x
let K = x => y => x
let K1 = x => y => y
let S = f => g => x => f(x, g(x))
let compose = f => g => x => f(g(x))
let twice = f => compose(f)(f)

// let preludeDefs: Defn[] = [
//   Defn(["I", ["x"], Var("x")]),
//   Defn(["K", ["x", "y"], Var("x")]),
//   Defn(["K1", ["x", "y"], Var("y")]),
//   Defn([
//     "S",
//     ["f", "g", "x"],
//     // S f g x = f x (g x)
//     Ap(Ap(Var("f"))(Var("x")))(Ap(Var("g"))(Var("x"))),
//   ]),
//   Defn(["compose", ["f", "g", "x"], Ap(Var("f"))(Ap(Var("g"))(Var("x")))]),
//   Defn(["twice", ["f"], Ap(Ap(Var("compose"))(Var("f")))(Var("f"))]),
// ]

// const globalEnv = {
//   I: x => x,
//   K: (x, y) => x,
//   K1: (x, y) => y,
//   S: (f, g, x) => f(x, g(x)),
//   compose: (f, g, x) => f(g(x)),
//   // twice: f => compose(f, f),
//   "+": x => y => x + y,
//   "-": x => y => x - y,
//   "*": x => y => x * y,
//   "/": x => y => x / y,
//   ">": x => y => x > y,
//   "<": x => y => x < y,
//   ">=": x => y => x >= y,
//   "<=": x => y => x <= y,
//   is: x => y => x === y,
//   isnt: x => y => x !== y,
//   max: Math.max,
//   min: Math.min,
//   not: x => !x,
//   or: x => y => x || y,
//   and: x => y => x && y,
// }

// const ifDefs: ScDefn[] = [
//   ScDefn(["True", ["t", "f"], Var("t")]),
//   ScDefn(["False", ["t", "f"], Var("f")]),
//   ScDefn(["if", ["x"], I(Var("x"))]),
//   ScDefn(["and", ["b1", "b2", "t", "f"], Ap(Var("b1"))(Ap(Var("b2")))])
// ]

/*
if = I
and b1 b2 t f = b1 (b2 t f) f
or b1 b2 t f = b1 t (b2 t f)
not b t f = b f t

pair a b f = f a b
casePair = I
fst p = p K
snd p = p K1

cons a b cn cc = cc a b
nil      cn cc = cn
caseList =
*/

// todo: finish this
// const pOneOrMore =
//   <a,>(p: Parser<a>): Parser<a> =>
//   (toks: Token[]) => {}

// page 25 has more efficient pretty printer and other print defns
// page 33 is parsing
// 37 has parsers I didn't make yet
