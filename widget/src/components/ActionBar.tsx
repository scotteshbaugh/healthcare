import { Checkmark, Locked, Phone } from '@carbon/icons-react'
import type { CarbonIconType } from '@carbon/icons-react'
import { spacing, type } from '../tokens'
import type { ActionPlanItem } from '../types'
import { Button, type ButtonVariant } from './Button'
import { Card } from './Card'

interface Action {
  id: string
  label: string
  doneLabel: string
  description: string
  icon: CarbonIconType
  variant: ButtonVariant
  /** What shows up as the plan card once this action is approved. */
  planTitle: string
  planSummary: string
}

const actions: Action[] = [
  {
    id: 'quarantine',
    label: 'Quarantine',
    doneLabel: 'Quarantined',
    description: 'Quarantine 238 patients who moved to High Risk, but likely because of EHR data issues',
    icon: Locked,
    variant: 'primary',
    planTitle: 'Quarantine 238 patients',
    planSummary:
      "Fires a data-quality ticket and holds these patients at their prior tier with a review date. Once the two sites' feeds are validated, the model re-scores against clean data and the quarantine lifts — most settle back, a few are genuinely high risk.",
  },
  {
    id: 'outreach',
    label: 'Approve outreach',
    doneLabel: 'Outreach approved',
    description: '102 patients show standard signs of deterioration and need intervention.',
    icon: Phone,
    variant: 'secondary',
    planTitle: 'Approve outreach for 102 patients',
    planSummary:
      'Standard procedure: care coordination places an outreach call and schedules a care-plan check-in within 5 business days. No change to tier status.',
  },
]

interface ActionBarProps {
  planItemIds: Set<string>
  onAddToPlan: (item: ActionPlanItem) => void
}

export function ActionBar({ planItemIds, onAddToPlan }: ActionBarProps) {
  return (
    <div style={{ display: 'flex', gap: spacing.spacing04, margin: '1.5rem 0 1rem', flexWrap: 'wrap' }}>
      {actions.map((action) => {
        const isDone = planItemIds.has(action.id)
        return (
          <Card key={action.id} style={{ flex: 1, minWidth: 240 }}>
            <p style={{ margin: 0, ...type.body01, color: 'var(--text-primary)' }}>{action.description}</p>
            <Button
              variant={action.variant}
              icon={isDone ? Checkmark : action.icon}
              iconPosition="start"
              onClick={() => onAddToPlan({ id: action.id, title: action.planTitle, summary: action.planSummary })}
              style={{
                maxWidth: 180,
                alignSelf: 'flex-end',
                marginTop: 'auto',
                ...(isDone ? { background: 'var(--bg-success)', color: 'var(--text-success)' } : {}),
              }}
            >
              {isDone ? action.doneLabel : action.label}
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
