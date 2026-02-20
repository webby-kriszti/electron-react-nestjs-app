import { ReactElement, useEffect, useRef } from 'react'
import { MapRenderer } from '../../features/maplibre/renderers/Maprenderer'
//import { MarkerRenderer } from './MarkerRenderer'

export function MaplibreView(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRendererRef = useRef<MapRenderer | null>(null)
  //const markerRendererRef = useRef<MarkerRenderer | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return
    if (mapRendererRef.current) return
    mapRendererRef.current = new MapRenderer({
      container: containerRef.current,
      center: [19.040235, 47.497913],
      zoom: 6
    })
/*     markerRendererRef.current = new MarkerRenderer([19.040235, 47.497913])
    mapRendererRef.current.add(markerRendererRef.current) */
    return () => {
      mapRendererRef.current?.destroy() // ← EZ KELL! Különben a map memóriában marad
      mapRendererRef.current = null
    }
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12 }}>
        <h2>Week 2 - Day 2: MapRenderer</h2>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}
