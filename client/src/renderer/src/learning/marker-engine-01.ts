import { Coord } from '@renderer/store/marker.store'

const createCoordSelector = (id: string): ((state) => Coord | undefined) => {
  return (state) => state.coordsById[id]
}
