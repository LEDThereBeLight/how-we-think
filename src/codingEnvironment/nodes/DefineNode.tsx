import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import TextInput from "../common/TextInput";
import DropTarget from "../common/DropTarget";
import { Layout, Space } from "antd";
import { motion } from "framer-motion";
import { Definition } from "../../language/syntax/types";
import nodeRegistry from "./nodeRegistry";
import humanId from "human-id";
import {NodeWrapper} from "./NodeWrapper"
/*
Definition({
    name: "length",
    params: [Parameter({ name: "alist", type: "List-Id" })],
    body: [
      Case(Var("alist"), [
        Alt("Nothing-Id", [], Num(0)),
        Alt(
          "Pair-Id",
          ["x", "xs"],
          Ap(Ap(Var("+"), Num(1)), Ap(Var("length"), Var("xs")))
        ),
      ]),
    ],
  }),
*/
interface Props {
  id: string;
  data: Definition;
}
export default function DefineNode(props: Props) {
  const def = props.data;
  console.log(props.data);
  const [name, setName] = useState(props.data.name);

  return (
    <motion.div>
      <Space align="baseline">
        <TextInput onChange={setName} value={name} />
        {def.params.map((param, i) => (
          <TextInput
            key={i + 1}
            onChange={(s) => (param.name = s)}
            value={param.name}
          />
        ))}
        <span>...</span>
        <span>=</span>
      </Space>

      {def.body.map((expr, index) => (
        <NodeWrapper
          key={expr}
          index={index}
          value={expr}
          text={expr}
          {...props}
        >
          {React.createElement(nodeRegistry[expr.t], {
            ...props,
            id: humanId(),
            data: expr,
          })}
        </NodeWrapper>
      ))}
    </motion.div>
  );
}
