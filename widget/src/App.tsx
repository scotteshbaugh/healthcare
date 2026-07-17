import { useEffect, useRef, useState } from 'react'
import { ActionBar } from './components/ActionBar'
import { InsightPanel } from './components/InsightPanel'
import { PromptBar } from './components/PromptBar'
import { RangeSelect } from './components/RangeSelect'
import { TabToggle } from './components/TabToggle'
import { TierDiagram } from './components/TierDiagram'
import { Toast } from './components/Toast'
import type { Mode, RangeWeeks, TierId } from './types'

function App() {
  const [mode, setMode] = useState<Mode>('alert')
  const [range, setRange] = useState<RangeWeeks>(3)
  const [hoveredNode, setHoveredNode] = useState<TierId | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  function showToast(message: string) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  function handleModeChange(next: Mode) {
    setMode(next)
    setHoveredNode(null)
    setHoveredEdge(null)
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>
      <h2 className="sr-only">
        High-risk migration review: 73 patients moved into the high-risk tier this window, shown as a diagram of five
        peer risk tiers with connections only where patients actually moved between them.
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 500 }}>High-risk migration review</h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            73 patients moved into high risk &middot; last {range} weeks
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <TabToggle mode={mode} onChange={handleModeChange} />
          <RangeSelect range={range} onChange={setRange} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 20, alignItems: 'start' }}>
        <InsightPanel mode={mode} range={range} hoveredNode={hoveredNode} hoveredEdge={hoveredEdge} />
        <TierDiagram
          mode={mode}
          range={range}
          hoveredNode={hoveredNode}
          hoveredEdge={hoveredEdge}
          onHoverNode={setHoveredNode}
          onHoverEdge={setHoveredEdge}
        />
      </div>

      <ActionBar onAction={showToast} />
      <PromptBar onSubmit={showToast} />
      <Toast message={toast} />
    </div>
  )
}

export default App
