import React, { useMemo, useState } from 'react'

type TabId = 'legacy' | 'map_marker' | 'map_circle' | 'zustand'

type TabDef = {
  id: TabId
  label: string
}

const TABS: TabDef[] = [
  { id: 'legacy', label: 'Régi' },
  { id: 'map_marker', label: 'MapLibre – Marker' },
  { id: 'map_circle', label: 'MapLibre – Kör (Turf)' },
  { id: 'zustand', label: 'Zustand' }
]

function TabButton({
  active,
  onClick,
  children
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        appearance: 'none',
        border: '1px solid #ccc',
        borderBottom: active ? '2px solid #000' : '1px solid #ccc',
        background: active ? '#fff' : '#f6f6f6',
        padding: '10px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: active ? 700 : 500
      }}
    >
      {children}
    </button>
  )
}

/**
 * IDE fogod betenni a meglévő "rendezetlen" App tartalmad.
 * 1) Nyiss egy LegacyView.tsx-et, és tedd át oda.
 * 2) Itt importáld és rendereld.
 *
 * Most direkt placeholder, hogy gyorsan induljunk.
 */
function LegacyView() {
  return (
    <div style={{ padding: 12 }}>
      <h2 style={{ margin: '0 0 8px 0' }}>Régi nézet</h2>
      <div style={{ opacity: 0.8 }}>
        Ide rakd át a meglévő App tartalmad (komponensbe kiszedve).
      </div>
    </div>
  )
}

/**
 * Ma ide fogjuk berakni a MapLibre minimumot.
 * Most placeholder.
 */
import maplibregl, { Map, Marker } from 'maplibre-gl'
import { useEffect, useRef } from 'react'

function MapLibreMarkerView() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const markerRef = useRef<Marker | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapRef.current) return // ne hozd létre kétszer (StrictMode)

    const center: [number, number] = [19.040235, 47.497913] // lon, lat (Budapest)

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center,
      zoom: 6
    })
    map.on('load', () => {
      const layers = map.getStyle().layers ?? []
      console.log('layer count:', layers.length)
      console.log(
        'sample layer ids:',
        layers.slice(0, 20).map((l) => l.id)
      )
    })

    mapRef.current = map

    // Marker
    const marker = new maplibregl.Marker().setLngLat(center).addTo(map)
    markerRef.current = marker

    return () => {
      // cleanup: ha a komponens unmountol (ablak/tab váltás, reload)
      markerRef.current?.remove()
      mapRef.current?.remove()
      markerRef.current = null
      mapRef.current = null
    }
  }, [])
  useEffect(() => {
    if (!mapRef.current) return

    // tabváltás után újraszámoljuk a map méretét
    setTimeout(() => {
      mapRef.current?.resize()
    }, 0)
  })

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 12 }}>
        <h2 style={{ margin: '0 0 8px 0' }}>MapLibre – Marker</h2>
        <div style={{ opacity: 0.8 }}>
          1 térkép + 1 marker (lon/lat). Következő: dinamikus koordináta.
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <div
          ref={mapContainerRef}
          style={{ height: '100%', width: '100%', borderTop: '1px solid #e5e5e5' }}
        />
      </div>
    </div>
  )
}

function MapLibreCircleView() {
  return (
    <div style={{ padding: 12 }}>
      <h2 style={{ margin: '0 0 8px 0' }}>MapLibre – Kör (Turf)</h2>
      <div style={{ opacity: 0.8 }}>
        Később: Turf-ből generált kör GeoJSON + MapLibre source/layer.
      </div>
    </div>
  )
}

function ZustandView() {
  return (
    <div style={{ padding: 12 }}>
      <h2 style={{ margin: '0 0 8px 0' }}>Zustand</h2>
      <div style={{ opacity: 0.8 }}>
        Később: store + selector + subscribe, és rákötjük a map frissítésre.
      </div>
    </div>
  )
}

function Content({ tab }: { tab: TabId }) {
  switch (tab) {
    case 'legacy':
      return <LegacyView />
    case 'map_marker':
      return <MapLibreMarkerView />
    case 'map_circle':
      return <MapLibreCircleView />
    case 'zustand':
      return <ZustandView />
    default:
      return null
  }
}

export default function App() {
  const [tab, setTab] = useState<TabId>('legacy')

  const activeLabel = useMemo(() => {
    return TABS.find((t) => t.id === tab)?.label ?? ''
  }, [tab])

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"'
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: 12,
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <TabButton key={t.id} active={t.id === tab} onClick={() => setTab(t.id)}>
              {t.label}
            </TabButton>
          ))}
        </div>

        <div style={{ opacity: 0.7, fontSize: 13 }}>{activeLabel}</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Content tab={tab} />
      </div>
    </div>
  )
}
