import React, { useMemo, useState } from 'react'
import { MaplibreView } from './features/maplibre/MaplibreView'
import DayIRefs from './learning/week-4/Day1-refs'
import { DevicePanel } from './learning/week-4/DevicePanel'

type TabId = 'legacy' | 'map_marker' | 'map_circle' | 'zustand' | 'learning_w1d2' | 'learning_w4d1'

type TabDef = {
  id: TabId
  label: string
}

const TABS: TabDef[] = [
  { id: 'legacy', label: 'Régi' },
  { id: 'map_marker', label: 'MapLibre – Marker' },
  { id: 'map_circle', label: 'MapLibre – Kör (Turf)' },
  { id: 'zustand', label: 'Zustand' },
  /* { id: 'learning_w1d2', label: 'Learning - Week 1 day 2' }, */
  //{ id: 'learning_w1d3', label: 'Learning - Week 1 Day 3' }
  { id: 'learning_w4d1', label: 'Learning - Week 4 Day 1' }
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
      return <MaplibreView/>
    case 'map_circle':
      return <MapLibreCircleView />
    case 'zustand':
      return <ZustandView />
    /* case 'learning_w1d2':
      return <Week1Day2Test /> */
    case 'learning_w4d1':
      return <DevicePanel />
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
