import { useEffect, useRef } from 'react'
import { MapRenderer } from './map/MapRenderer'
import { MarkerRenderer } from './renderers/MarkerRenderer'
import { RangeRingsRenderer } from './renderers/RangeRingsRenderer'
import { SectorRenderer } from './renderers/SectorRenderer'

export function MapLibreMarkerView() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // class példányok refben (nem state)
  const mapRendererRef = useRef<MapRenderer | null>(null)
  const markerRendererRef = useRef<MarkerRenderer | null>(null)
  const rangeRingsRendererRef = useRef<RangeRingsRenderer | null>(null)
  const SectorRendererRef = useRef<SectorRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (mapRendererRef.current) return // StrictMode védelem

    const center: [number, number] = [19.040235, 47.497913]

    const mapRenderer = new MapRenderer({
      container: containerRef.current,
      center,
      zoom: 6,
      styleUrl: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
    })

    const markerRenderer = new MarkerRenderer(center)
    const rangeRingsRenderer = new RangeRingsRenderer('range-rings', center, [5000, 7000, 3000])
    const sectorRenderer = new SectorRenderer('sector', center, 5000, 0)

    mapRenderer.add(markerRenderer)
    mapRenderer.add(rangeRingsRenderer)
    mapRenderer.add(sectorRenderer)

    mapRendererRef.current = mapRenderer
    markerRendererRef.current = markerRenderer
    rangeRingsRendererRef.current = rangeRingsRenderer
    SectorRendererRef.current = sectorRenderer

    return () => {
      mapRendererRef.current?.destroy()
      mapRendererRef.current = null
      markerRendererRef.current = null
      rangeRingsRendererRef.current = null
      SectorRendererRef.current = null
    }
  }, [])

  // tabváltás/resize workaround – maradhat
  useEffect(() => {
    if (!mapRendererRef.current) return
    setTimeout(() => mapRendererRef.current?.resize(), 0)
  })

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12 }}>
        <h2 style={{ margin: '0 0 8px 0' }}>MapLibre – Marker (Renderer struktúra)</h2>
        <div style={{ opacity: 0.8 }}>
          MapRenderer (map életciklus) + MarkerRenderer (marker logika)
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <div
          ref={containerRef}
          style={{ height: '100%', width: '100%', borderTop: '1px solid #e5e5e5' }}
        />
      </div>
    </div>
  )
}
