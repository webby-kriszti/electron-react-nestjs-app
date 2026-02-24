import { MapChildRenderer } from './MapChildRenderer'
import * as turf from '@turf/turf'
import { useCityStore } from './stores/CityStore'

export class CircleRenderer implements MapChildRenderer {
  private center: [number, number] = [0, 0]
  private sourceId: string = 'source-id'
  private layerId: string = 'layer-id'
  private map: maplibregl.Map | null = null
  private initialized: boolean = false
  private dirty: boolean = false
  private unsubFromPosition: (() => void) | null = null
  constructor(center: [number, number]) {
    this.center = center
    this.unsubFromPosition = useCityStore.subscribe((state) => {
      this.center = state.markerPosition
      this.dirty = true
    })
  }
  init(): void {
    this.map!.addSource(this.sourceId, {
      type: 'geojson', // adat típusa
      data: { type: 'FeatureCollection', features: [] } // kezdetben üres
    })

    this.map!.addLayer({
      id: this.layerId, // egyedi azonosító
      type: 'line', // kitöltött terület (kör polygon-hoz ez kell)
      source: this.sourceId, // melyik source-ból vegyen adatot
      paint: {
        'line-color': '#ff0000',
        'line-opacity': 0.3,
        'line-width': 2
      }
    })
    this.initialized = true
    this.dirty = true
  }
  update(map: maplibregl.Map): void {
    this.map = map
    if (!this.initialized) {
      this.init()
    }
    if (!this.dirty) return
    const source = this.map!.getSource(this.sourceId) as maplibregl.GeoJSONSource
    if (source) {
      source.setData(this.createCircleData())
    }

    this.dirty = false
  }
  destroy(): void {
    this.unsubFromPosition?.()
    if (this.map?.getLayer(this.sourceId)) {
      this.map.removeLayer(this.sourceId)
    }
  }
  setCenter(center: [number, number]): void {
    this.center = center
    this.dirty = true
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private createCircleData() {
    const radii = [5, 10, 15] // km-ben
    const circles = radii.map((r) => turf.circle(this.center, r, { units: 'kilometers' }))
    return turf.featureCollection(circles)
  }
}
