import { ReactElement, useEffect, useState } from 'react'

export function Week4Day1Effects(): ReactElement {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log('MOUNT — egyszer fut')
  }, [])
  useEffect(() => {
    console.log('RENDER — minden rendereléskor')
  })
  useEffect(() => {
    console.log('COUNT CHANGED:', count)
  }, [count])

  return (
    <div style={{ padding: 20 }}>
      <h2>Week 4 - Day 1: useEffect</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type something" />
    </div>
  )
}
