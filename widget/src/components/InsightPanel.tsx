import type { CSSProperties } from 'react'
import { edges, rangeMultiplier, tiers } from '../data'
import type { Mode, RangeWeeks, TierId } from '../types'

interface InsightPanelProps {
  mode: Mode
  range: RangeWeeks
  hoveredNode: TierId | null
  hoveredEdge: string | null
}

function edgeCount(alert: number, avg: number, mode: Mode, range: RangeWeeks) {
  const base = mode === 'alert' ? alert : avg
  return Math.round(base * rangeMultiplier[range])
}

export function InsightPanel({ mode, range, hoveredNode, hoveredEdge }: InsightPanelProps) {
  const panelStyle: CSSProperties = {
    background: 'var(--surface-1)',
    borderRadius: 'var(--radius)',
    padding: '1rem',
    minHeight: 280,
    fontSize: 14,
    lineHeight: 1.6,
  }

  if (hoveredEdge) {
    const e = edges.find((x) => x.id === hoveredEdge)!
    const count = edgeCount(e.alert, e.avg, mode, range)
    const avgCount = Math.round(e.avg * rangeMultiplier[range])
    const delta = count - avgCount

    return (
      <div style={panelStyle}>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 500, color: 'var(--text-accent)' }}>{e.label}</p>
        <p style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 500 }}>
          {count} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-secondary)' }}>patients</span>
        </p>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          typically {avgCount} for this window &middot; {delta >= 0 ? `+${delta}` : delta} this period
        </p>
      </div>
    )
  }

  if (hoveredNode) {
    const t = tiers.find((x) => x.id === hoveredNode)!
    return (
      <div style={panelStyle}>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t.label}</p>
        <p style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>
          {t.pop} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-secondary)' }}>patients currently in this tier</span>
        </p>
      </div>
    )
  }

  const total = edges.reduce((sum, e) => sum + edgeCount(e.alert, e.avg, mode, range), 0)
  const avgTotal = edges.reduce((sum, e) => sum + Math.round(e.avg * rangeMultiplier[range]), 0)
  const [atRisk, risingRisk] = edges.map((e) => edgeCount(e.alert, e.avg, mode, range))

  if (mode === 'alert') {
    return (
      <div style={panelStyle}>
        <p style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>
          {total} patients moved into high risk this window — {risingRisk} from rising risk, {atRisk} from at risk.
        </p>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          That's roughly {(total / avgTotal).toFixed(1)}× the typical volume for a {range}-week window ({avgTotal}).
        </p>
      </div>
    )
  }

  return (
    <div style={panelStyle}>
      <p style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>
        Typically about {avgTotal} patients move into high risk over a {range}-week window.
      </p>
      <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
        Hover a connection or switch to alert window to compare against what moved this period.
      </p>
    </div>
  )
}
