import { InsightPanel } from './InsightPanel'
import { TierDiagram } from './TierDiagram'
import { spacing } from '../tokens'

export function MigrationReview() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.spacing01,
        alignItems: 'stretch',
      }}
    >
      {/* Flex-basis, not a media query -- collapses to a stack whenever the
          row gets too narrow to fit both, whether from viewport size or the
          action plan panel pushing the content area over. */}
      <div style={{ flex: '1 1 0', minWidth: 200 }}>
        <InsightPanel />
      </div>
      {/* minWidth only covers the cards column's own minimum (200px + box
          padding) -- the diagram itself now has a container query
          (tier-diagram.css) that hides the svg and hands the row to the
          cards once it can't fit both, so this doesn't need to reserve
          room for the chart too. */}
      <div style={{ flex: '3 1 0', minWidth: 240 }}>
        <TierDiagram />
      </div>
    </div>
  )
}
