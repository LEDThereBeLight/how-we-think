import Case from "./CaseNode";
import Define from "./DefineNode";
import Line from "./LineNode";
import If from "./IfNode";
import Apply from "./ApplyNode";
import React from 'react';

const Var = (p) => {
  console.log('var', p.data)
  return <>{p.data.name}</>
}
const Num = (p) => {
  console.log('num', p.data)
  return <>{p.data.v}</>
}
const Alt = (p) => {
  console.log('alt', p.data)
  return <div>
    Tag: {p.data.tag}
    Vars: {p.data.vars.join(', ')}
    {JSON.stringify(p.data.expr, null, ' ')}
  </div>
}

// language expression type to renderer
export default {
  data: (x) => <>{JSON.stringify(x.data)}</>,
  var: (x) => Var,
  num: Num,
  constr: (x) => <>{JSON.stringify(x.data)}</>,
  ap: Apply,
  case: Case,
  fn: (x) => <>{JSON.stringify(x.data)}</>,
  let: (x) => <>{JSON.stringify(x.data)}</>,
  alt: Alt,
  defn: Define,
  if: If,
}