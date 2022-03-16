import { inspect } from "util"

// const semantics: IntuitSemantics = grammar.createSemantics()

const prog1 = `
length alist =
  if alist is [] then 0
  else 1 + length tail alist`
const prog2 = `\
length alist = expr`

const prog3 = `\
f=3
g x y = let z = x in z
h x = case (let y = x in y) do
  <1> -> 2
  <2> -> 5
end
`

const prog4 = `\
f x y = case x do
  <1> ->
    case y do
      <1> -> 1
    end
  <2> -> 2
end
1
`

const prog5 = `\
10 * 2 / 3 + 4
`

const fac = `\

fac n = if n is 0 do 1 else n * (fac (n - 1)) end
fac 3
`
// ap(+)(ap(/)(ap(ap(*)(10))(2))(3))(4)

try {
  const prgms = [
    "if 10 is 0 do true else false end",
    // "main = I 3",
    // "id = S K K",
    // "main = twice twice twice (S K K 3)",
    // "main = twice (I I I) 3",
    // "infinite x = cons x (infinite x)",
    // "main = hd (tl (infinite 4))",
    // `oct g x = let h = twice g
    //            in let k = twice h
    //            in k (k x) end

    // main = oct I 4`,
    // "length xs = xs length1 0 \n length1 x xs = 1 + (length xs)",
    // `fac n = if (n is 0) 1 else (n * fac (n - 1))
    // main = fac 5`,
    // `gcd a b = if (a is b)
    //              a
    //            if (a < b)
    //              (gcd b a)
    //            (gcd b (a - b)) ;
    // `gcd 6 10`
  ]
  // const env = createEnv()
  const prog = `
  (def defn
    (macro (name args body)
      (quasiquote
        (def (unquote name) (fn (unquote args) (unquote body))))))

  (def fac (fn (n) (if (= n 0) 1 (quote (* n fac (- n 1))))))

  (fac 5)
  `
  // console.log(run(prog, env))
  // evaluate
} catch (e) {
  console.log(inspect(e))
}

// semantics.addOperation<any>("toAst()", {
//   Program(lines) {
//     console.log("lines", lines)
//     return lines.children.map(l => l.toAst())
//   },
//   Definition(x) {
//     console.log("definition", x)
//   },
// })

export const run = (str: string, env) => {
  // const match = grammar.match(str);
  // console.log('match', match)
  // if (match.failed()) throw new Error(match.message)
  // console.log('semantics', semantics(match))
  // return semantics(match).toAst()
  // return semantics(match).eval(env)
  // return semantics(match).toAST().map(ast => ast.eval(env))
}

const Env = (parent = {}) => {
  const env = Object.create(parent)

  return {
    bind: (name, value) => ((env[name] = value), value),
    get: name => env[name],
  }
}

export const globalEnv = () => {
  const env = Env()

  env.bind("+", 1)

  return env
}

// export const evaluate = (expr: string, env) =>
//   semantics(grammar.match(expr)).eval(env)
