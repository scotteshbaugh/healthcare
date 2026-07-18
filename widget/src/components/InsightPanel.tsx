import type { CSSProperties } from 'react'
import { edges, tiers } from '../data'
import { type } from '../tokens'
import type { TierId } from '../types'

interface InsightPanelProps {
  hoveredNode: TierId | null
  hoveredEdge: string | null
}

export function InsightPanel({ hoveredNode, hoveredEdge }: InsightPanelProps) {
  const panelStyle: CSSProperties = {
    background: 'var(--surface-1)',
    padding: '1rem',
    height: '100%',
    ...type.body01,
  }

  if (hoveredEdge) {
    const e = edges.find((x) => x.id === hoveredEdge)!
    const delta = e.alert - e.avg

    return (
      <div style={panelStyle}>
        <p style={{ margin: '0 0 8px', ...type.label01, color: 'var(--text-accent)' }}>{e.label}</p>
        <p style={{ margin: '0 0 12px', ...type.heading03 }}>
          {e.alert} <span style={{ ...type.helperText01, color: 'var(--text-secondary)' }}>patients</span>
        </p>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          typically {e.avg} for this window &middot; {delta >= 0 ? `+${delta}` : delta} this period
        </p>
      </div>
    )
  }

  if (hoveredNode) {
    const t = tiers.find((x) => x.id === hoveredNode)!
    return (
      <div style={panelStyle}>
        <p style={{ margin: '0 0 8px', ...type.label01, color: 'var(--text-primary)' }}>{t.label}</p>
        <p style={{ margin: 0, ...type.heading03 }}>
          {t.pop} <span style={{ ...type.helperText01, color: 'var(--text-secondary)' }}>patients currently in this tier</span>
        </p>
      </div>
    )
  }

  return (
    <div style={panelStyle}>
      <p style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>
        340 moved to the high risk segment in the past eleven days.
      </p>
      <p style={{ margin: 0, color: 'var(--text-secondary)' }}>This is four times the normal.</p>
    </div>
  )
}
