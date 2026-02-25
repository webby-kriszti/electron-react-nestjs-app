import { ReactElement, useRef } from 'react'

const DayIRefs = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const previousValueRef = useRef<number>(0)
  const handleButtonClick = (): void => {
    inputRef.current?.focus()
    const data = previousValueRef.current
    previousValueRef.current = data + 1
  }
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleButtonClick}>Focus</button>
      <button
        onClick={() => {
          alert(previousValueRef.current)
        }}
      >
        How many?
      </button>
    </div>
  )
}

export default DayIRefs
