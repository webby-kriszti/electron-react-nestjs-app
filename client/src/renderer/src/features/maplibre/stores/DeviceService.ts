import { useDeviceStore } from './DeviceStore'

export const deviceService = {
  addDevice(name: string, position: [number, number]): void {
    const { actions } = useDeviceStore.getState()
    const id = Date.now().toString()
    const newDevice = {
      id: id,
      name: name,
      position: position,
      isActive: true
    }
    actions.addDevice(newDevice)
  },
  removeDevice(id: string): void {
    const { actions } = useDeviceStore.getState()
    actions.removeDevice(id)
  }
}
