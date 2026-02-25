import { deviceService } from '../../stores/DeviceService'
import { Device, useDeviceStore } from '../../stores/DeviceStore'
interface DeviceUtility {
  devices: Record<string, Device>
  removeDevice: (id: string) => void
  addDevice: (name: string, position: [number, number]) => void
}

export function useDevices(): DeviceUtility {
  const devices = useDeviceStore((s) => s.devices)

  return { devices, removeDevice: deviceService.removeDevice, addDevice: deviceService.addDevice }
}
