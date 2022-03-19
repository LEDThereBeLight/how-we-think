export function compareMin<V>(a: any, b: any) {
  return a.layout.min - b.layout.min
}

export function checkReorder<T>(
  order: any[],
  value: T,
  offset: number,
  velocity: number
): any[] {
  if (!velocity) return order

  const index = order.findIndex(item => item.value === value)

  if (index === -1) return order

  const nextOffset = velocity > 0 ? 1 : -1
  const nextItem = order[index + nextOffset]

  if (!nextItem) return order

  const item = order[index]
  const mix = (from, to, progress) => -progress * from + progress * to + from
  const nextItemCenter = mix(nextItem.layout.min, nextItem.layout.max, 0.5)

  if (
    (nextOffset === 1 && item.layout.max + offset > nextItemCenter) ||
    (nextOffset === -1 && item.layout.min + offset < nextItemCenter)
  ) {
    return moveItem(order, index, index + nextOffset)
  }

  return order
}

export function moveItem<T>([...arr]: T[], fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex

  if (startIndex >= 0 && startIndex < arr.length) {
    const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex

    const [item] = arr.splice(fromIndex, 1)
    arr.splice(endIndex, 0, item)
  }

  return arr
}

export function removeItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item)
  index > -1 && arr.splice(index, 1)
}