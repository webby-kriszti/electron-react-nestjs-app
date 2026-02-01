import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export type LngLat = { lng: number; lat: number }

type MarkerCoordState = {
  coordsById: Record<string, LngLat | undefined>
  setCoord: (id: string, coord: LngLat) => void
  clearCoord: (id: string) => void
}

export const markerCoordStore = create<MarkerCoordState>()(
  subscribeWithSelector((set) => ({
    coordsById: {},

    setCoord: (id, coord) =>
      set((state) => ({
        coordsById: { ...state.coordsById, [id]: coord }
      })),

    clearCoord: (id) =>
      set((state) => {
        const next = { ...state.coordsById }
        delete next[id]
        return { coordsById: next }
      })
  }))
)
