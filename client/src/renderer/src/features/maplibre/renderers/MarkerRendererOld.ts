import maplibregl, { type Map as MlMap, type Marker } from 'maplibre-gl'
import type { MapChildRenderer } from '../map/types'

export class MarkerRenderer implements MapChildRenderer {
  private marker: Marker | null = null
  private lngLat: [number, number]
  private dirty = true

  constructor(initialLngLat: [number, number]) {
    this.lngLat = initialLngLat
  }

  init(map: MlMap): void {
    // csak egyszer
    this.marker = new maplibregl.Marker().setLngLat(this.lngLat).addTo(map)

    this.dirty = false
  }

  update(_map: MlMap): void {
    if (!this.dirty) return
    if (!this.marker) return

    this.marker.setLngLat(this.lngLat)
    this.dirty = false
  }

  destroy(_map: MlMap): void {
    this.marker?.remove()
    this.marker = null
    this.dirty = true
  }

  // API kívülről: később store/subscription is ezt fogja hívni
  public setLngLat(lngLat: [number, number]) {
    this.lngLat = lngLat
    this.dirty = true
  }
}
