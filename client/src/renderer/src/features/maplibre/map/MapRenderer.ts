import maplibregl, { type Map as MlMap } from 'maplibre-gl'
import type { MapChildRenderer } from './types'

export type MapRendererOptions = {
  container: HTMLElement
  center: [number, number] // [lng, lat]
  zoom: number
  styleUrl: string
}

export class MapRenderer {
  private map: MlMap
  private rafId: number | null = null
  private children: MapChildRenderer[] = []
  private started = false

  constructor(opts: MapRendererOptions) {
    this.map = new maplibregl.Map({
      container: opts.container,
      style: opts.styleUrl,
      center: opts.center,
      zoom: opts.zoom
    })

    // fontos: csak load után initeljük a childokat
    this.map.on('load', () => {
      this.children.forEach((c) => c.init(this.map))
      this.startLoop()
    })
  }

  public add(child: MapChildRenderer) {
    this.children.push(child)
    // ha a map már betöltött, azonnal init
    if (this.map.isStyleLoaded()) {
      child.init(this.map)
    }
  }

  public getMap(): MlMap {
    return this.map
  }

  private startLoop() {
    if (this.started) return
    this.started = true

    const loop = () => {
      // update: child dönt, hogy csinál-e valamit (dirty)
      this.children.forEach((c) => c.update(this.map))
      this.rafId = requestAnimationFrame(loop)
    }

    this.rafId = requestAnimationFrame(loop)
  }

  public resize() {
    this.map.resize()
  }

  public destroy() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }

    // child destroy (fordított sorrendben szokás biztonságosabb)
    for (let i = this.children.length - 1; i >= 0; i--) {
      this.children[i].destroy(this.map)
    }
    this.children = []

    this.map.remove()
  }
}
