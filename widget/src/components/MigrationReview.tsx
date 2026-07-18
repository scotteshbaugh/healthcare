import { useState } from 'react'
import { InsightPanel } from './InsightPanel'
import { TierDiagram } from './TierDiagram'
import { spacing } from '../tokens'
import type { TierId } from '../types'

export function MigrationReview() {
  const [hoveredNode, setHoveredNode] = useState<TierId | null>(null)
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)',
        gap: spacing.spacing01,
        alignItems: 'stretch',
      }}
    >
      <InsightPanel hoveredNode={hoveredNode} hoveredEdge={hoveredEdge} />
      <TierDiagram
        hoveredNode={hoveredNode}
        hoveredEdge={hoveredEdge}
        onHoverNode={setHoveredNode}
        onHoverEdge={setHoveredEdge}
      />
    </div>
  )
}
