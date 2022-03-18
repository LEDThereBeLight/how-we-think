import React, { useState } from "react"
import Dropdown from "../common/Dropdown"
import TextInput from "../common/TextInput"
import DropTarget from "../common/DropTarget"
import { Space } from "antd"
import { motion } from "framer-motion"
import { Definition } from "../../language/syntax/types"
// Define node has to support multiple expressions in its body
// e.g. multiple defs, then an expr to eval
interface Props {
  id: string
  definition: Definition
}
export default function DefineNode(props) {
  const [word, setWord] = useState("")

  return (
    <motion.div drag>
      <Space
        align="baseline"
        style={{
          padding: "0.8rem",
          border: "1px solid #eee",
          backgroundColor: "white",
        }}
      >
        <Dropdown
          defaultValue={"word"}
          options={[
            { label: "word", value: "word" },
            { label: "data", value: "data" },
          ]}
        />
        <TextInput onChange={setWord} value={word} />
        <span>...</span>
        <span>=</span>
      </Space>
      <DropTarget parentId={props.id} renderer={<></>} />
    </motion.div>
  )
}
