import React, { useState } from "react"
import { Select, Divider, Input, Typography, Space, SelectProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"

const { Option } = Select

export default function Dropdown({ options: defaultItems }: SelectProps) {
  const [items, setItems] = useState(defaultItems)
  const [name, setName] = useState("")

  const onNameChange = event => {
    setName(event.target.value)
  }

  return (
    <Select placeholder="custom dropdown render" defaultValue={items[0]}>
      {items.map(item => (
        <Option key={item.value}>{item.label}</Option>
      ))}
    </Select>
  )
}
