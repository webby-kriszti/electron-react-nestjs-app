import { ReactElement } from 'react'
import { Device } from '../../features/maplibre/stores/DeviceStore'

interface DeviceCardProps {
  device: Device
  onRemove: (id: string) => void
}

const DeviceCard = ({ device, onRemove }: DeviceCardProps): ReactElement => {
  console.log(device, onRemove)
  return (
    <div>
      <h3>{device.name}</h3>
      <h4>
        position: {device.position[0]}, {device.position[1]}
      </h4>
      <button onClick={() => onRemove(device.id)}>Remove</button>
    </div>
  )
}

export default DeviceCard
