import type { Map as MlMap } from 'maplibre-gl'
import type { MapChildRenderer } from '../map/types'
import * as turf from '@turf/turf'
import type { Feature, FeatureCollection, Point, Polygon } from 'geojson'
export type Kind = 'label' | 'ring'

export class RangeRingsRenderer implements MapChildRenderer {
  private readonly idPrefix: string
  private readonly sourceId: string
  private readonly lineLayerId: string
  private readonly labelLayerId: string
  private dirty = true
  private center: [number, number]
  private radiiM: number[]

  constructor(idPrefix: string, center: [number, number], radiiM: number[]) {
    this.center = center
    this.radiiM = [...radiiM.sort((a, b) => a - b)]
    this.dirty = true
    this.idPrefix = idPrefix
    this.sourceId = `${idPrefix}-source`
    this.labelLayerId = `${idPrefix}-label`
    this.lineLayerId = `${idPrefix}-line`
  }
  init(map: MlMap): void {
    if (!map.getSource(this.sourceId)) {
      map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      })
    }
    if (!map.getLayer(this.lineLayerId)) {
      map.addLayer({
        id: this.lineLayerId,
        type: 'line',
        source: this.sourceId,
        filter: ['==', ['get', 'kind'], 'ring'],
        paint: {
          'line-width': 2,
          'line-color': '#111'
        }
      })
    }
    if (!map.getLayer(this.labelLayerId)) {
      map.addLayer({
        id: this.labelLayerId,
        type: 'symbol',
        source: this.sourceId,
        filter: ['==', ['get', 'kind'], 'label'],
        layout: {
          'text-field': ['get', 'text'],
          'text-size': 12,
          'text-allow-overlap': false
        },
        paint: {
          'text-color': '#111',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      })
    }
    this.dirty = true
  }
  update(map: MlMap): void {
    if (!this.dirty) return
    const rings: Feature<Polygon>[] = []
    const usedRadii = this.radiiM.slice(0, 2)
    for (let ringIdx = 0; ringIdx < usedRadii.length; ringIdx++) {
      const radiusM = usedRadii[ringIdx]
      const radiusKm = radiusM / 1000
      const circle = turf.circle(this.center, radiusKm, { steps: 128, units: 'kilometers' })
      circle.properties = {
        ...(circle.properties ?? {}),
        kind: 'ring' as Kind,
        ringIdx,
        radiusM
      }
      rings.push(circle)
    }
    const labels: Feature<Point>[] = []
    const centerPt = turf.point(this.center)
    for (let ringIdx = 0; ringIdx < usedRadii.length; ringIdx++) {
      const radiusM = usedRadii[ringIdx]
      const radiusKm = radiusM / 1000
      const p = turf.destination(centerPt, radiusKm, 0, { units: 'kilometers' })
      p.properties = {
        ...(p.properties ?? {}),
        kind: 'label' as Kind,
        ringIdx,
        radiusM,
        angleDeg: 0,
        text: `${Math.round(radiusM)}m`
      }
      labels.push(p)
    }
    const fc: FeatureCollection = {
      type: 'FeatureCollection',
      features: [...rings, ...labels]
    }
    const src = map.getSource(this.sourceId) as any
    src?.setData?.(fc)
    this.dirty = false
  }
  destroy(map: MlMap): void {
    //TODO map.off('zoom', this. onZoom)
    if (map.getLayer(this.labelLayerId)) map.removeLayer(this.labelLayerId)
    if (map.getLayer(this.lineLayerId)) map.removeLayer(this.lineLayerId)

    // 3) source
    if (map.getSource(this.sourceId)) map.removeSource(this.sourceId)
  }
}
