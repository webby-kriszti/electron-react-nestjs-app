import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type ActiveMarkerState = {
  activeMarkerId: string | null
  setActiveMarker: (id: string) => void
  clearActiveMarker: () => void
}
export const activeMarkerStore = create<ActiveMarkerState>((set) => ({
  activeMarkerId: null,

  setActiveMarker: (id: string) => set({ activeMarkerId: id }),

  clearActiveMarker: () => set({ activeMarkerId: null })
}))
