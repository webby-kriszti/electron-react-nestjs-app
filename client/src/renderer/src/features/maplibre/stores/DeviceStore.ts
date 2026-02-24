import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface Device {
  id: string
  name: string
  position: [number, number]
  isActive: boolean
}
interface DeviceStore {
  devices: Record<string, Device>
  selectedDeviceId: string | null
  actions: {
    addDevice: (device: Device) => void
    removeDevice: (id: string) => void
    updateDevicePosition: (id: string, position: [number, number]) => void
  }
}
export const useDeviceStore = create<DeviceStore>()(
  subscribeWithSelector((set) => ({
    devices: { 'device-1': { id: '11', name: 'Cat', position: [19, 47], isActive: true } },
    selectedDeviceId: null,
    actions: {
      addDevice: (device) =>
        set((state) => ({ devices: { ...state.devices, [device.id]: device } })),
      removeDevice: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.devices
          return { devices: rest }
        }),
      updateDevicePosition: (id: string, position: [number, number]) =>
        set((state) => ({
          devices: { ...state.devices, [id]: { ...state.devices[id], position: position } }
        }))
    }
  }))
)
