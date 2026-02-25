import { ReactElement } from 'react'
import DeviceList from './DeviceList'
import DeviceForm from './DeviceForm'
import { useDevices } from '@renderer/features/maplibre/renderers/hooks/useDevices'

export const DevicePanel = (): ReactElement => {
  const { devices, removeDevice, addDevice } = useDevices()

  return (
    <>
      <div>
        <h3>DevicePanel</h3>
        <DeviceList devices={devices} onRemove={removeDevice} />
      </div>
      <div>
        <DeviceForm onAdd={addDevice} />
      </div>
    </>
  )
}
