import { ArrowRight } from '@carbon/icons-react'
import { tiers } from '../data'
import { spacing, type } from '../tokens'
import { Card } from './Card'

/**
 * Totals live here, not on the chord diagram -- that diagram shows movement
 * only (net change, or nothing for tiers with no movement to report). This
 * is the one place the actual population counts show up. Sits as a compact
 * stack to the right of the chord diagram, not a grid of large tiles.
 */
export function TierSummaryCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing02 }}>
      {tiers.map((t) => {
        const hasMovement = t.netMovement !== undefined
        const isGain = hasMovement && t.netMovement! > 0

        return (
          <Card
            key={t.id}
            variant="ghost"
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.spacing04,
              padding: spacing.spacing03,
              background: 'var(--surface-1)',
            }}
          >
            <div>
              <p style={{ margin: 0, ...type.body02, color: 'var(--text-primary)' }}>{t.label}</p>
              {/* body01, not body02 -- on the real Carbon scale body-01 is the 14px step, body-02 is 16px. */}
              <p style={{ margin: 0, ...type.body01, color: 'var(--text-secondary)' }}>{t.pop.toLocaleString()}</p>
            </div>
            {hasMovement && (
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.spacing02 }}>
                <span style={{ ...type.heading03, color: 'var(--text-primary)' }}>
                  {isGain ? `+${t.netMovement}` : t.netMovement}
                </span>
                {isGain ? (
                  <span
                    aria-hidden
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: 'var(--brand)',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <ArrowRight size={20} aria-hidden style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                )}
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
