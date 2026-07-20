import { useState } from 'react'
import { radius, spacing, type } from '../tokens'
import type { ActionPlanItem } from '../types'
import { Button } from './Button'
import { Card } from './Card'
import { OverflowMenu } from './OverflowMenu'

interface ActionPlanItemCardProps {
  item: ActionPlanItem
  onEdit: (id: string, summary: string) => void
  onDelete: (id: string) => void
}

export function ActionPlanItemCard({ item, onEdit, onDelete }: ActionPlanItemCardProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(item.summary)

  function save() {
    onEdit(item.id, draft.trim() || item.summary)
    setEditing(false)
  }

  return (
    <Card variant="ghost" style={{ gap: spacing.spacing03 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.spacing02 }}>
        <p style={{ margin: 0, ...type.body02, color: 'var(--text-primary)' }}>{item.title}</p>
        <OverflowMenu
          label={`${item.title} actions`}
          items={[
            {
              label: 'Edit',
              onSelect: () => {
                setDraft(item.summary)
                setEditing(true)
              },
            },
            { label: 'Remove', onSelect: () => onDelete(item.id), danger: true },
          ]}
        />
      </div>

      {editing ? (
        <>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              resize: 'vertical',
              border: '0.5px solid var(--border)',
              borderRadius: radius.radius02,
              background: 'var(--surface-2)',
              color: 'var(--text-primary)',
              padding: spacing.spacing03,
              ...type.body01,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: spacing.spacing02 }}>
            <Button variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={save}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <p style={{ margin: 0, ...type.body01, color: 'var(--text-secondary)' }}>{item.summary}</p>
      )}
    </Card>
  )
}
