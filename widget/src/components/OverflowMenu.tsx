import { OverflowMenuVertical } from '@carbon/icons-react'
import { useEffect, useRef, useState } from 'react'
import { radius, spacing, type } from '../tokens'
import { IconButton } from './Button'

export interface OverflowMenuItem {
  label: string
  onSelect: () => void
  danger?: boolean
}

interface OverflowMenuProps {
  items: OverflowMenuItem[]
  label?: string
}

export function OverflowMenu({ items, label = 'More actions' }: OverflowMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <IconButton icon={OverflowMenuVertical} label={label} variant="ghost" onClick={() => setOpen((o) => !o)} />
      {open && (
        <div
          role="menu"
          aria-label={label}
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: spacing.spacing01,
            background: 'var(--surface-2)',
            border: '0.5px solid var(--border)',
            borderRadius: radius.radius02,
            minWidth: 120,
            padding: spacing.spacing02,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.spacing01,
            zIndex: 10,
          }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onSelect()
                setOpen(false)
              }}
              style={{
                ...type.body01,
                textAlign: 'left',
                height: 'auto',
                padding: `${spacing.spacing02}px ${spacing.spacing03}px`,
                border: 'none',
                background: 'transparent',
                color: item.danger ? 'var(--text-warning)' : 'var(--text-primary)',
                borderRadius: radius.radius02,
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
