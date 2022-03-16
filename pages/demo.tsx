import Foo from "../content/foo.mdx";

export default function Demo() {
  return (
    <div style={{ width: 900, margin: "0 auto" }}>
      <Foo />
    </div>
  );
}

let isEmpty = (xs) => xs == []
const head = (xs) => xs[0]
const tail = xs => xs[1]
const equals = (x, y) => x === y


let isMember = (x, alist) => {
  if (isEmpty(alist)) return false
  if (equals(head(alist), x)) return true
  return isMember(x, tail(alist))
}
//   isEmpty(head(alist))? false
//   else if (hd === x) true
//   else isMember(x, tl)
// }
