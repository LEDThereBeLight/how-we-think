import React from "react";
import { Case } from "../../language/syntax/types";
import { motion } from "framer-motion";
import TextInput from "../common/TextInput";
import { Space } from "antd";
import useState from "react";
import humanId from "human-id";
import nodeRegistry from "./nodeRegistry";

// Case(Var("alist"), [
//   Alt("Nothing-Id", [], Num(0)),
//   Alt(
//     "Pair-Id",
//     ["x", "xs"],
//     Ap(Ap(Var("+"), Num(1)), Ap(Var("length"), Var("xs")))
//   ),
// ]),
interface P {
  id: string;
  data: Case;
}
export default function CaseNode(props: P) {
  console.log(props.data)
  return (
    <motion.div
      className="case-node"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space align="baseline">
        <div>case</div>
        {React.createElement(nodeRegistry[props.data.expr.t], {
          ...props,
          id: humanId(),
          data: props.data.expr,
        })}
        <div>...</div>
        <div>of</div>
      </Space>

      {props.data.alts.map((expr) =>
        React.createElement(nodeRegistry[expr.t], {
          ...props,
          id: humanId(),
          data: expr,
        })
      )}
    </motion.div>
  );
}
