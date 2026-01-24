import { ReactElement } from 'react'
import { rangeStore } from '../store/range.store'

export function RangeViewer():ReactElement {
  const value = rangeStore((state) => state.value)
  const setValue = rangeStore((state) => state.setValue)

  return (
    <div>
      <div>Current range: {value}</div>
      <button onClick={() => setValue(value + 10)}>Increase</button>
    </div>
  )
}
