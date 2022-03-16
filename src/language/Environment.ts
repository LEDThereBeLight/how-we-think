import { map, pick, pluck, zipObj } from "ramda"
import { Identifier, Value } from "./language"

export type Env = {
  find: (id: Identifier) => Value
}

interface GlobalEnv extends Env {}

const find = (env: Env) => (identifier: Identifier) => env[identifier.value]

export default (identifiers: Identifier[], values: Value[], outer) => {
  const frame = Object.create(
    outer,
    zipObj(pluck("value")(identifiers), values)
  )

  return {
    find: find(frame),
  }
}

export const globalEnv = (): Env => ({
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  ">": (x, y) => x > y,
  "<": (x, y) => x < y,
  ">=": (x, y) => x >= y,
  "<=": (x, y) => x <= y,
  is: (x, y) => x === y,
  not: x => !x,

  apply: (proc, args) => proc(...args),
  head: xs => xs[0],
  tail: xs => xs.slice(1),
  pair: (x, y) => [x, y],
  isEmpty: xs => xs === [],
})
