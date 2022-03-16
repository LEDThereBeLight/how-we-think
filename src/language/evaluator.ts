import { Program, Statement } from "./language"

/*
length alist = case alist do
  [] -> 0
  x:xs -> 1 + length xs
end

length alist =
  if alist is [] do 0
  else 1 + length tail alist
  end
*/

// if alist is [], do: 0, else: 1 + length tail alist

export const evaluate = (p: Program, env) => {
  console.log('program', p)
  const evaluateS = (s: Statement) => {
    switch (s.t) {
      case "ap":
        console.log("applying l", evaluateS(s.l))
        console.log("to r", evaluateS(s.r))
        return evaluateS(s.l)(evaluateS(s.r))
      case "case":
        console.log("case not implemented")
        return
      case "constr":
        console.log("constr not implemented")
        return
      case "defn":
        // on define proc, add name
        // on apply proc, replace params with args?
        // or do lambdas cover it
        env[s.name] = evaluateS(s.body)
        console.log("defn, name, env[name]", s.name, env[s.name])
        return env[s.name]
      case "fn":
        console.log("fn not implemented")
        return s
      case "let":
        console.log("let not implemented")
        // new scope?
        return
      case "num":
        console.log("number", s.v)
        return s.v
      case "var":
        console.log("var", s.name, env[s.name])
        return env[s.name]
      case "if":
        if (evaluateS(s.test) === true) return s.conseq
        return s.alt
    }
  }
  return p.map(evaluateS)
}
