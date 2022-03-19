import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Program as ProgramT } from "../../language/syntax/types";
import { lengthProgram } from "./demoData";
import { inspect } from "util";
import { NodeWrapper } from "../nodes/NodeWrapper";
import { checkReorder, compareMin } from "../common/dragAndDropUtils";
import nodeRegistry from '../nodes/nodeRegistry'
import humanId from 'human-id';

const programToLines = (program: ProgramT): any[] => {
  return program;
};

export default function Program() {
  const [lines, setLines] = useState(programToLines(lengthProgram));

  const order = [];
  const isReordering = useRef(false);

  const registerItem = (value, layout) => {
    if (layout && order.findIndex((entry) => value === entry.value) === -1) {
      order.push({ value, layout: layout["y"] });
      order.sort(compareMin);
    }
  };

  useEffect(() => {
    isReordering.current = false;
  });

  const onReorder = setLines;

  const updateOrder = (id, offset, velocity) => {
    if (isReordering.current) return;

    const newOrder = checkReorder(order, id, offset, velocity);
    if (order !== newOrder) {
      isReordering.current = true;

      onReorder(
        newOrder
          .map((item) => item.value)
          .filter((value) => lines.indexOf(value) !== -1)
      );
    }
  };

  return (
    <main
      style={{
        flexGrow: "1",
        height: "100%",
        backgroundColor: "rgb(205 209 194)",
      }}
      className="reactflow-wrapper reorderable-program"
    >
      <motion.ul>
        {lines.map((expr, index) => (
          <NodeWrapper
            key={expr}
            index={index}
            value={expr}
            text={expr}
            updateOrder={updateOrder}
            registerItem={registerItem}
          >{React.createElement(nodeRegistry[expr.t], { id: humanId(), data: expr, updateOrder, registerItem })}
            </NodeWrapper>
        ))}
      </motion.ul>
    </main>
  );
}
