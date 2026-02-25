import { Device } from '@renderer/features/maplibre/stores/DeviceStore'
import { ReactElement } from 'react'
import DeviceCard from './DeviceCard'

interface ListProps {
  devices: Record<string, Device>
  onRemove: (id: string) => void
}

const DeviceList = ({ devices, onRemove }: ListProps): ReactElement => {
  return (
    <div>
      <h2>DeviceList</h2>
      {Object.values(devices).map((device) => (
        <DeviceCard key={device.id} device={device} onRemove={onRemove} />
      ))}
    </div>
  )
}

export default DeviceList
