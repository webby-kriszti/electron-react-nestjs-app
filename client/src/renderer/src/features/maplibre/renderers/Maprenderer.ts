import maplibregl from 'maplibre-gl'
import { MapChildRenderer } from '../MapChildRenderer'
import { MarkerRenderer } from '../MarkerRenderer'

interface Config {
  container: HTMLDivElement
  center: [lng: number, lat: number]
  zoom: number
}
export class MapRenderer {
  private map: maplibregl.Map
  private rafId: number | null = null
  private children: MapChildRenderer[] = []
  private tick: () => void
  private markerRenderer: MarkerRenderer

  constructor(config: Config) {
    this.map = new maplibregl.Map({
      container: config.container,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: config.center,
      zoom: config.zoom
    })
    this.tick = () => {
      for (const child of this.children) {
        child.update(this.map)
      }
      this.rafId = requestAnimationFrame(this.tick)
    }
    this.rafId = requestAnimationFrame(this.tick)
    this.markerRenderer = new MarkerRenderer(config.center)
    this.add(this.markerRenderer)
  }
  add(child: MapChildRenderer): void {
    this.children.push(child)
  }
  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
    }
    for (const child of this.children) {
      child.destroy()
    }
    this.map.remove()
  }
}
