import { tiers, edges, rangeMultiplier } from '../data'
import { CENTER, bezierPoint, pointOnRing, quadraticPath } from '../geometry'
import type { Mode, RangeWeeks, TierId } from '../types'

interface TierDiagramProps {
  mode: Mode
  range: RangeWeeks
  hoveredNode: TierId | null
  hoveredEdge: string | null
  onHoverNode: (id: TierId | null) => void
  onHoverEdge: (id: string | null) => void
}

function edgeCount(alert: number, avg: number, mode: Mode, range: RangeWeeks) {
  const base = mode === 'alert' ? alert : avg
  return Math.round(base * rangeMultiplier[range])
}

export function TierDiagram({ mode, range, hoveredNode, hoveredEdge, onHoverNode, onHoverEdge }: TierDiagramProps) {
  return (
    <div style={{ background: 'var(--surface-1)', borderRadius: 12, padding: '0.5rem' }}>
      <svg
        viewBox="0 0 380 390"
        style={{ width: '100%', height: 'auto' }}
        role="img"
        aria-label="Diagram of five risk tiers with connections showing patient movement between at-risk, rising-risk and high-risk tiers this window"
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--text-secondary)" />
          </marker>
        </defs>

        {edges.map((e) => {
          const from = tiers.find((t) => t.id === e.from)!
          const to = tiers.find((t) => t.id === e.to)!
          const p0 = pointOnRing(from.angle)
          const p1 = pointOnRing(to.angle)
          const isHovered = hoveredEdge === e.id
          const count = edgeCount(e.alert, e.avg, mode, range)
          const strokeWidth = 1 + Math.sqrt(count) * 0.35
          const d = quadraticPath(p0, CENTER, p1)
          const labelPos = bezierPoint(p0, CENTER, p1, 0.72)

          return (
            <g key={e.id}>
              <path
                d={d}
                fill="none"
                stroke="transparent"
                strokeWidth={16}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => onHoverEdge(e.id)}
                onMouseLeave={() => onHoverEdge(null)}
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
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                fontSize={12}
                fontWeight={500}
                fill={isHovered ? 'var(--text-accent)' : 'var(--text-secondary)'}
                pointerEvents="none"
              >
                +{count}
              </text>
            </g>
          )
        })}

        {tiers.map((t) => {
          const p = pointOnRing(t.angle)
          const r = 8 + Math.sqrt(t.pop) * 1.7
          const isHovered = hoveredNode === t.id
          const rr = isHovered ? r * 1.08 : r
          const fill = t.highlight ? 'var(--bg-accent)' : 'var(--surface-2)'
          const stroke = t.highlight ? 'var(--border-accent)' : 'var(--border-strong)'
          const textColor = t.highlight ? 'var(--text-accent)' : 'var(--text-primary)'
          const dy = Math.sin((t.angle * Math.PI) / 180) >= 0 ? rr + 18 : -(rr + 10)

          return (
            <g
              key={t.id}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHoverNode(t.id)}
              onMouseLeave={() => onHoverNode(null)}
            >
              <circle cx={p.x} cy={p.y} r={rr} fill={fill} stroke={stroke} strokeWidth={isHovered ? 2 : 1} />
              <text x={p.x} y={p.y + dy - 8} textAnchor="middle" fontSize={12} fill="var(--text-primary)">
                {t.label}
              </text>
              <text x={p.x} y={p.y + dy + 7} textAnchor="middle" fontSize={11} fontWeight={500} fill={textColor}>
                {t.pop}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
