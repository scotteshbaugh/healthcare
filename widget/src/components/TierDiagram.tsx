import { Download } from '@carbon/icons-react'
import { useState } from 'react'
import { tiers, edges } from '../data'
import { CENTER, bentPath, bezierPoint, pointOnRing } from '../geometry'
import { spacing, type } from '../tokens'
import type { TierId } from '../types'
import { Button } from './Button'
import { TierSummaryCards } from './TierSummaryCards'
import './tier-diagram.css'

// No formal stroke-width token scale (unlike spacing/type/radius) -- these
// two values are spec'd directly from the Figma reference.
const GHOST_STROKE_WIDTH = 2
const ACTIVE_STROKE_WIDTH = 4

// Gap between a bubble's edge and its label, measured along the radial line
// from the ring's center through the bubble -- this is on the real spacing
// scale (spacing03 = 8px), unlike the stroke widths above.
const LABEL_GAP = spacing.spacing03

function downloadTiersCsv() {
  const header = ['Tier', 'Population', 'Net movement']
  const rows = tiers.map((t) => [t.label, t.pop, t.netMovement ?? ''])
  const csv = [header, ...rows].map((row) => row.join(',')).join('\n')

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'tier-migration.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// Hover only drives the glow on the segment itself -- nothing outside this
// component reacts to it, so the state stays local instead of being lifted.
export function TierDiagram() {
  const [hoveredNode, setHoveredNode] = useState<TierId | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)
  const highRisk = tiers.find((t) => t.id === 'high-risk')!
  const highRiskPos = pointOnRing(highRisk.angle)
  const possibleConnections = tiers.filter((t) => t.id !== 'high-risk')

  return (
    <div style={{ background: 'var(--surface-1)', padding: spacing.spacing04, display: 'flex', flexDirection: 'column', gap: spacing.spacing04 }}>
      <div className="tier-diagram-row" style={{ display: 'flex', gap: spacing.spacing04, alignItems: 'center' }}>
        {/* Only this pane scrolls when the svg's static size doesn't fit --
            the cards column sits outside it, sized on its own, never clipped
            by the diagram's fixed dimensions. Below the container-query
            threshold in tier-diagram.css, this pane hides entirely instead. */}
        <div className="tier-diagram-svg-pane">
          <svg
            viewBox="-40 0 420 390"
            width={420}
            height={390}
            style={{ flexShrink: 0 }}
            role="img"
            aria-label="Diagram of five risk tiers with connections showing patient movement between at-risk, rising-risk and high-risk tiers this window"
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="14" markerHeight="14" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--text-secondary)" />
              </marker>
            </defs>

            {/* Ghost trace: every tier that could feed into high risk, not just the ones that did.
                Dashed since it's a possibility, not an observed movement -- the tiers that did
                move (at-risk, rising-risk) get a real solid edge drawn on top of this. */}
            {possibleConnections.map((t) => (
              <path
                key={`possible-${t.id}`}
                d={bentPath(pointOnRing(t.angle), CENTER, highRiskPos)}
                fill="none"
                stroke="var(--surface-2)"
                strokeWidth={GHOST_STROKE_WIDTH}
                strokeDasharray="4 4"
                pointerEvents="none"
              />
            ))}

            {edges.map((e) => {
              const from = tiers.find((t) => t.id === e.from)!
              const to = tiers.find((t) => t.id === e.to)!
              const p0 = pointOnRing(from.angle)
              const p1 = pointOnRing(to.angle)
              const isHovered = hoveredEdge === e.id
              const count = e.alert
              const strokeWidth = ACTIVE_STROKE_WIDTH
              const d = bentPath(p0, CENTER, p1)
              const labelPos = bezierPoint(p0, CENTER, p1, 0.72)

              return (
                <g key={e.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredEdge(e.id)}
                    onMouseLeave={() => setHoveredEdge(null)}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={isHovered ? 'var(--text-accent)' : 'var(--border-strong)'}
                    strokeWidth={isHovered ? strokeWidth + 1.5 : strokeWidth}
                    opacity={isHovered ? 1 : 0.8}
                    markerEnd="url(#arrow)"
                    pointerEvents="none"
                  />
                  {e.to !== 'high-risk' && (
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      style={type.label01}
                      fill={isHovered ? 'var(--text-accent)' : 'var(--text-secondary)'}
                      pointerEvents="none"
                    >
                      +{count}
                    </text>
                  )}
                </g>
              )
            })}

            {tiers.map((t) => {
              const p = pointOnRing(t.angle)
              const r = 8 + Math.sqrt(t.pop) * 0.23
              const isHovered = hoveredNode === t.id
              const fill = t.highlight ? 'var(--brand)' : 'var(--cyan-10)'

              // Label block sits along the same ray from CENTER through the bubble,
              // pushed out past the bubble's edge by LABEL_GAP. Alignment flips so
              // the text always grows outward, away from the circle, never into it.
              const rad = (t.angle * Math.PI) / 180
              const dirX = Math.cos(rad)
              const dirY = Math.sin(rad)
              const anchorX = p.x + dirX * (r + LABEL_GAP)
              const anchorY = p.y + dirY * (r + LABEL_GAP)
              const textAnchor = dirX >= 0 ? 'start' : 'end'

              return (
                <g
                  key={t.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredNode(t.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r}
                    fill={fill}
                    style={{ filter: isHovered ? `drop-shadow(0 0 16px color-mix(in srgb, ${fill} 30%, transparent))` : 'none' }}
                  />
                  <text x={anchorX} y={anchorY - 9} textAnchor={textAnchor} style={type.label02} fill="var(--text-primary)">
                    {t.label}
                  </text>
                  {t.netMovement !== undefined && (
                    <text x={anchorX} y={anchorY + 8} textAnchor={textAnchor} style={type.label02} fill="var(--text-primary)">
                      {t.netMovement > 0 ? `+${t.netMovement}` : t.netMovement}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        <div className="tier-diagram-cards-pane">
          <TierSummaryCards />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="ghost" icon={Download} onClick={downloadTiersCsv}>
          Download .csv
        </Button>
      </div>
    </div>
  )
}
