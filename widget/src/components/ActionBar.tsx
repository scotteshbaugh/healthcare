import { Checkmark, Locked, Phone } from '@carbon/icons-react'
import type { CarbonIconType } from '@carbon/icons-react'
import { useState } from 'react'

interface Action {
  id: string
  label: string
  doneLabel: string
  icon: CarbonIconType
  prompt: string
  accent?: boolean
}

const actions: Action[] = [
  {
    id: 'quarantine',
    label: 'Quarantine',
    doneLabel: 'Quarantined',
    icon: Locked,
    prompt: 'Quarantine the 73 patients who migrated into high risk this window and hold them pending review.',
  },
  {
    id: 'outreach',
    label: 'Approve outreach',
    doneLabel: 'Outreach approved',
    icon: Phone,
    prompt: 'Approve outreach to the patients who migrated into high risk this window.',
  },
  {
    id: 'sign',
    label: 'Sign off',
    doneLabel: 'Signed off',
    icon: Checkmark,
    prompt: 'Sign off on this high-risk migration batch as reviewed.',
    accent: true,
  },
]

interface ActionBarProps {
  onAction: (prompt: string) => void
}

export function ActionBar({ onAction }: ActionBarProps) {
  const [done, setDone] = useState<Record<string, boolean>>({})

  return (
    <div style={{ display: 'flex', gap: 8, margin: '1.5rem 0 1rem', flexWrap: 'wrap' }}>
      {actions.map((action) => {
        const isDone = done[action.id]
        const Icon = isDone ? Checkmark : action.icon
        return (
          <button
            key={action.id}
            onClick={() => {
              setDone((prev) => ({ ...prev, [action.id]: true }))
              onAction(action.prompt)
            }}
            style={{
              background: isDone ? 'var(--bg-success)' : 'transparent',
              borderColor: isDone ? 'var(--border-success)' : action.accent ? 'var(--border-accent)' : 'var(--border-strong)',
              color: isDone ? 'var(--text-success)' : action.accent ? 'var(--text-accent)' : 'var(--text-primary)',
            }}
          >
            <Icon aria-hidden="true" size={16} style={{ marginRight: 6, verticalAlign: '-2px' }} />
            {isDone ? action.doneLabel : action.label}
          </button>
        )
      })}
    </div>
  )
}
