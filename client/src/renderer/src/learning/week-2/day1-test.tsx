import { ReactElement, useRef, useState } from 'react'
import { Counter } from './day1-classes'

export function Week2Day1Test(): ReactElement {
  const counterRef = useRef(new Counter(5))
  // ???

  const [display, setDisplay] = useState(0)

  function handleIncrement(): void {
    // 2. Hívd meg a counter increment-jét
    // 3. Frissítsd a display-t a counter aktuális értékével
    counterRef.current.increment()
    const newValue = counterRef.current.getCount()
    setDisplay(newValue)
  }

  function handleDecrement(): void {
    counterRef.current.decrement()
    const newValue = counterRef.current.getCount()
    setDisplay(newValue)
  }

  function handleReset(): void {
    counterRef.current.reset()
    const newValue = counterRef.current.getCount()
    setDisplay(newValue)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Week 2 - Day 1: Classes</h2>
      <p>Count: {display}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
