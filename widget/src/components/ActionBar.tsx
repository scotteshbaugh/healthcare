import { useState } from 'react'

interface Action {
  id: string
  label: string
  doneLabel: string
  icon: string
  prompt: string
  accent?: boolean
}

const actions: Action[] = [
  {
    id: 'quarantine',
    label: 'Quarantine',
    doneLabel: 'Quarantined',
    icon: 'ti-lock',
    prompt: 'Quarantine the 73 patients who migrated into high risk this window and hold them pending review.',
  },
  {
    id: 'outreach',
    label: 'Approve outreach',
    doneLabel: 'Outreach approved',
    icon: 'ti-phone',
    prompt: 'Approve outreach to the patients who migrated into high risk this window.',
  },
  {
    id: 'sign',
    label: 'Sign off',
    doneLabel: 'Signed off',
    icon: 'ti-check',
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
            <i
              className={`ti ${isDone ? 'ti-check' : action.icon}`}
              aria-hidden="true"
              style={{ marginRight: 6, verticalAlign: '-2px' }}
            />
            {isDone ? action.doneLabel : action.label}
          </button>
        )
      })}
    </div>
  )
}
