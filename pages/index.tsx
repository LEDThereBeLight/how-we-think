import Link from "next/link";
import Foo from "../content/foo.mdx";

export default function Page() {
  return (
    <div style={{ width: 900, margin: "0 auto" }}>
      <Link href="/demo">
        <a>Demo</a>
      </Link>
      <Link href="/recursion">
        <a>Recursion</a>
      </Link>
    </div>
  );
}
