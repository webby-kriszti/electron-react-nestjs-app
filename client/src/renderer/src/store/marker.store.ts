import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coord = { lat: number; lon: number };

type MarkerState = {
  coordsById: Record<string, Coord | undefined>;
  setCoord: (id: string, coord: Coord) => void;
};

export const markerStore = create<MarkerState>()(
  subscribeWithSelector((set) => ({
    coordsById: {},
    setCoord: (id, coord) =>
      set((state) => ({
        coordsById: { ...state.coordsById, [id]: coord },
      })),
  }))
);
