import { create } from 'zustand'

interface CityStore {
  markerPosition: [number, number]
  setMarkerPosition: (position: [number, number]) => void
}
export const useCityStore = create<CityStore>((set) => ({
  markerPosition: [19.040235, 47.497913],
  setMarkerPosition: (position) => set({ markerPosition: position })
}))

