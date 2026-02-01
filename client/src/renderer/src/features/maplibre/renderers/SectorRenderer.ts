import type { Map as MlMap } from 'maplibre-gl'
import type { MapChildRenderer } from '../map/types'
import * as turf from '@turf/turf'
import type { Feature, FeatureCollection, Point, Polygon } from 'geojson'
type Kind = 'sector' | 'centerline'

export class SectorRenderer implements MapChildRenderer {
  private readonly idPrefix: string
  private readonly sourceId: string
  private readonly fillLayerId: string
  private readonly outlineLayerId: string
  private readonly centerLineLayerId: string

  private dirty: boolean = false
  private center: [number, number]
  private radiusM: number
  private directionDeg: number

  constructor(idPrefix: string, center: [number, number], radiusM: number, directionDeg: number) {
    this.idPrefix = idPrefix
    this.sourceId = `${idPrefix}-source`
    this.fillLayerId = `${idPrefix}-fill`
    this.outlineLayerId = `${idPrefix}-outline`
    this.centerLineLayerId = `${idPrefix}-centerline`
    this.center = center
    this.radiusM = radiusM
    this.directionDeg = directionDeg
    this.dirty = true
  }
  /* public setCenter(center: [number, number]) {
    this.center = center
    this.dirty = true
  }
  public setRange(range: number) {}
  public setDirection(directionDeg: number) {} */
  init(map: MlMap): void {
    if (!map.getSource(this.sourceId)) {
      map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      })
    }

    // outline
    if (!map.getLayer(this.outlineLayerId)) {
      map.addLayer({
        id: this.outlineLayerId,
        type: 'line',
        source: this.sourceId,
        filter: ['==', ['get', 'kind'], 'sector'],
        paint: {
          'line-color': '#b45309',
          'line-width': 2
        }
      })
    }
    if (!map.getLayer(this.centerLineLayerId)) {
      map.addLayer({
        id: this.centerLineLayerId,
        type: 'line',
        source: this.sourceId,
        filter: ['==', ['get', 'kind'], 'centerline'],
        paint: {
          'line-color': '#111',
          'line-width': 2
        }
      })
    }
    this.dirty = true
  }
  update(map: MlMap): void {
    if (!this.dirty) return

    const radiusKm = this.radiusM / 1000
    const halfAngle = 45 // 90° szélesség fele

    const start = this.directionDeg - halfAngle
    const end = this.directionDeg + halfAngle

    const centerPt = turf.point(this.center)

    // --- 1) Tick a karimán: fele befelé, fele kifelé ---
    const tickLenM = 500 // FIX teljes hossz (állítsd, ha kell)
    const halfTickM = tickLenM / 2

    const innerKm = Math.max((this.radiusM - halfTickM) / 1000, 0)
    const outerKm = (this.radiusM + halfTickM) / 1000

    const t1 = turf.destination(centerPt, innerKm, this.directionDeg, { units: 'kilometers' })
    const t2 = turf.destination(centerPt, outerKm, this.directionDeg, { units: 'kilometers' })

    const tick = turf.lineString([
      t1.geometry.coordinates as [number, number],
      t2.geometry.coordinates as [number, number]
    ])
    tick.properties = {
      ...(tick.properties ?? {}),
      kind: 'centerline',
      directionDeg: this.directionDeg,
      radiusM: this.radiusM
    }

    // --- 2) Sector outline: center -> startTip -> arc -> endTip -> center ---
    const steps = 64
    const arcCoords: [number, number][] = []

    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const bearing = start + (end - start) * t
      const p = turf.destination(centerPt, radiusKm, bearing, { units: 'kilometers' })
      arcCoords.push(p.geometry.coordinates as [number, number])
    }

    const startTip = arcCoords[0]
    const endTip = arcCoords[arcCoords.length - 1]

    const outlineCoords: [number, number][] = [
      this.center,
      startTip,
      ...arcCoords,
      endTip,
      this.center
    ]
    const outline = turf.lineString(outlineCoords)
    outline.properties = {
      ...(outline.properties ?? {}),
      kind: 'sector',
      directionDeg: this.directionDeg,
      radiusM: this.radiusM
    }

    // --- 3) setData ---
    const fc = turf.featureCollection([outline, tick])

    const src = map.getSource(this.sourceId) as any
    src?.setData?.(fc)

    this.dirty = false
  }

  destroy(map: MlMap): void {}
}
