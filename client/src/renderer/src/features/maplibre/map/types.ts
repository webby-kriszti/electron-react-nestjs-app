import type { Map as MlMap } from 'maplibre-gl'

export interface MapChildRenderer {
  init(map: MlMap): void
  update(map: MlMap): void
  destroy(map: MlMap): void
}
