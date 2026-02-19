import maplibregl from 'maplibre-gl'
import { point as turfPoint } from '@turf/helpers'
import destination from '@turf/destination'

type LngLat = [number, number]

export class BeamRenderer {
  // --- ids ---
  private readonly sourceId: string
  private readonly layerId: string

  // --- geometry inputs ---
  private readonly center: LngLat
  private readonly radiusMeters: number
  public readonly sectorWidthDeg: number

  // --- polygon state used by buildFeatureCollection ---
  public startDeg = 0
  public endDeg = 0

  // --- renderer flags ---
  private initialized = false
  private dirty = true

  // --- animation state (MINIMÁL, dt NÉLKÜL) ---
  private isAnimating = false
  private aDeg = 0
  private bDeg = 0
  private currentDeg = 0
  private dir: 1 | -1 = 1
  private speedDegPerFrame = 0.2

  constructor(opts: {
    sourceId: string
    layerId: string
    center: LngLat
    radiusMeters: number
    sectorWidthDeg: number
  }) {
    this.sourceId = opts.sourceId
    this.layerId = opts.layerId
    this.center = opts.center
    this.radiusMeters = opts.radiusMeters
    this.sectorWidthDeg = opts.sectorWidthDeg
  }

  // 1) INIT: csak map erőforrások
  init(map: maplibregl.Map): void {
    if (this.initialized) return
    if (!map.isStyleLoaded()) return

    if (!map.getSource(this.sourceId)) {
      map.addSource(this.sourceId, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
      })
    }

    if (!map.getLayer(this.layerId)) {
      map.addLayer({
        id: this.layerId,
        type: 'fill',
        source: this.sourceId,
        paint: {
          'fill-color': '#ff0000',
          'fill-opacity': 0.4
        }
      })
    }

    this.initialized = true

    // ideiglenesen: induljon rögtön (később ezt store/listener fogja vezérelni)
    this.startAnimation(230, 260)
  }

  // 2) UPDATE: init -> step -> setData ha dirty
  public update(map: maplibregl.Map): void {
    this.init(map)
    if (!this.initialized) return

    if (this.isAnimating) {
      this.step()
    }

    if (!this.dirty) return

    const src = map.getSource(this.sourceId) as maplibregl.GeoJSONSource
    src.setData(this.buildFeatureCollection())

    this.dirty = false
  }

  // 3) STEP: A↔B oda-vissza, és beírja a polygon szögeket + dirty
  private step(): void {
    this.currentDeg += this.dir * this.speedDegPerFrame

    if (this.currentDeg >= this.bDeg) {
      this.currentDeg = this.bDeg
      this.dir = -1
    } else if (this.currentDeg <= this.aDeg) {
      this.currentDeg = this.aDeg
      this.dir = 1
    }

    this.startDeg = this.currentDeg
    this.endDeg = this.currentDeg + this.sectorWidthDeg

    this.dirty = true
  }

  // 4) ANIM START/STOP (most minimál)
  public startAnimation(aDeg: number, bDeg: number): void {
    this.aDeg = aDeg
    this.bDeg = bDeg

    this.currentDeg = aDeg
    this.dir = 1

    this.isAnimating = true
    this.dirty = true
  }

  public stopAnimation(): void {
    this.isAnimating = false
  }

  // 5) DESTROY: takarítás
  public destroy(map: maplibregl.Map): void {
    this.stopAnimation()

    if (map.getLayer(this.layerId)) map.removeLayer(this.layerId)
    if (map.getSource(this.sourceId)) map.removeSource(this.sourceId)

    this.initialized = false
    this.dirty = true
  }
  private buildFeatureCollection(): GeoJSON.FeatureCollection {
    //const half = this.widthDeg / 2
    const startDeg = 90 /* this.headingDeg - half */
    const endDeg = 92 /* this.headingDeg + half */

    const p1 = this.destinationPoint(this.center, startDeg, this.radiusMeters)
    const p2 = this.destinationPoint(this.center, endDeg, this.radiusMeters)

    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[this.center, p1, p2, this.center]]
          }
        }
      ]
    }
  }

  // --- GeoJSON build: a this.startDeg / this.endDeg alapján ---
  /* private buildFeatureCollection(): GeoJSON.FeatureCollection {
    const p1 = this.destinationPoint(this.center, this.startDeg, this.radiusMeters)
    const p2 = this.destinationPoint(this.center, this.endDeg, this.radiusMeters)

    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [[this.center, p1, p2, this.center]]
          }
        }
      ]
    }
  } */

  // KÖSD RÁ A SAJÁT MEGLÉVŐ FÜGGVÉNYEDRE
  // npm i @turf/turf

  private destinationPoint(center: LngLat, bearingDeg: number, distM: number): LngLat {
    // Turf expects [lng, lat]
    const from = turfPoint(center)

    // Turf distance is in kilometers by default
    const distKm = distM / 1000

    const res = destination(from, distKm, bearingDeg, { units: 'kilometers' })
    const [lng, lat] = res.geometry.coordinates as [number, number]
    return [lng, lat]
  }
}
