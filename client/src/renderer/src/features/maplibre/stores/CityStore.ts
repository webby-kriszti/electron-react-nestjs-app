import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface CityStore {
  markerPosition: [number, number]
  circleRadii: number[]
  selectedCity: string | null
  actions: {
    setMarkerPosition: (position: [number, number]) => void
    setCircleRadii: (radii: number[]) => void
    setSelectedCity: (city: string) => void
  }
}
export const useCityStore = create<CityStore>()(
  subscribeWithSelector((set) => ({
    markerPosition: [19.040235, 47.497913],
    circleRadii: [1000, 2000, 3000, 4000],
    selectedCity: 'Budapest',
    actions: {
      setMarkerPosition: (position) => set({ markerPosition: position }),
      setCircleRadii: (radii) => set({ circleRadii: radii }),
      setSelectedCity: (city) => set({ selectedCity: city }),
    }
  }))
)
