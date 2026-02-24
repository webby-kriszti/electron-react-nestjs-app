import { MapChildRenderer } from './MapChildRenderer'
import maplibregl from 'maplibre-gl'
import { useCityStore } from './stores/CityStore'

export class MarkerRenderer implements MapChildRenderer {
  private dirty: boolean = false
  private initialized: boolean = false
  private center: [number, number]
  private marker: maplibregl.Marker | null = null
  private map: maplibregl.Map | null = null
  private unsubFromPosition: (() => void) | null = null
  constructor(center: [number, number]) {
    this.center = center
    this.unsubFromPosition = useCityStore.subscribe(
      (state) => state.markerPosition,
      (markerPosition) => {
        this.center = markerPosition
        this.dirty = true
      }
    )
  }
  init(): void {
    this.marker = new maplibregl.Marker().setLngLat(this.center).addTo(this.map!)
  }
  update(map: maplibregl.Map): void {
    this.map = map
    if (!this.initialized) {
      this.init()
      this.initialized = true
    }
    if (this.dirty) {
      this.marker!.setLngLat(this.center)
      this.dirty = false
    }
  }
  setCenter(center: [number, number]): void {
    console.log('Hi')
    this.center = center
    this.dirty = true
  }
  destroy(): void {
    this.unsubFromPosition?.()
    if (this.marker) {
      this.marker.remove()
      this.marker = null
    }
  }
}
