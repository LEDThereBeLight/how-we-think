import React, { useState } from "react"
import { AnimatePresence, Reorder } from "framer-motion"

export default function ReorderableList() {
  const [items, setItems] = useState(["zero", "one", "two", "three"])

  return (
    <Reorder.Group dragPropagation axis="y" values={items} onReorder={setItems}>
      <AnimatePresence>
        {items.map(item => (
          <Reorder.Item
            drag
            dragPropagation
            key={item}
            value={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {item}
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  )
}
