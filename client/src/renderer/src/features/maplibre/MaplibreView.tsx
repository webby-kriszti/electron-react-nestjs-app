import { ReactElement, useEffect, useRef } from 'react'
import { MapRenderer } from '../../features/maplibre/renderers/Maprenderer'
import { cityService } from './stores/citiyService'

export function MaplibreView(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRendererRef = useRef<MapRenderer | null>(null)

  useEffect(() => {
    if (containerRef.current === null) return
    if (mapRendererRef.current) return
    mapRendererRef.current = new MapRenderer({
      container: containerRef.current,
      center: [19.040235, 47.497913],
      zoom: 6
    })

    return () => {
      mapRendererRef.current?.destroy() // ← EZ KELL! Különben a map memóriában marad
      mapRendererRef.current = null
    }
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12 }}>
        <h2>Week 2 - Day 2: MapRenderer</h2>
        <button onClick={() => cityService.selectCity('Debrecen')}>Debrecen</button>
        <button onClick={() => cityService.selectCity('Budapest')}>Budapest</button>
        <button onClick={cityService.startSimulation}>Start moving</button>
        <button onClick={cityService.stopSimulation}>Stop</button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}
