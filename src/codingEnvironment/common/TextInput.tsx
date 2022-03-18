import React, { memo, useCallback, useRef, useState } from "react"

interface Props {
  value: string
  onChange: (s: string) => any
}
export default memo(function TextInput(props: Props) {
  const [value] = useState(props.value)
  const ref = useRef<HTMLSpanElement | null>(null)

  const onChange = useCallback(
    () => props.onChange(ref.current.innerText.trim()),
    [props.onChange]
  )
  return (
    <span
      style={{ cursor: "text" }}
      ref={ref}
      className="nodrag ant-input"
      role="textbox"
      contentEditable
      suppressContentEditableWarning
      onInput={onChange}
      onBlur={onChange}
    >
      {value}
    </span>
  )
})
