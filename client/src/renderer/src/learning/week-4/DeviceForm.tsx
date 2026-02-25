import { ReactElement, useState } from 'react'

interface FormProps {
  onAdd: (name: string, position: [number, number]) => void
}

const DeviceForm = ({ onAdd }: FormProps): ReactElement => {
  const [deviceName, setDeviceName] = useState('')
  const handleSubmit = (e): void => {
    e.preventDefault()
    onAdd(deviceName, [19.04, 47.49])
    setDeviceName('')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={deviceName}
          placeholder="Enter name"
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default DeviceForm
