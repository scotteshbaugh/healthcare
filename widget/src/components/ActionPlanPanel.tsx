import { ChevronLeft, ChevronRight, Close } from '@carbon/icons-react'
import { spacing, type } from '../tokens'
import type { ActionPlanItem } from '../types'
import { ActionPlanItemCard } from './ActionPlanItemCard'
import { Button, IconButton } from './Button'
import './action-plan-panel.css'

// Exported so PromptBar (a sibling, not a parent/child) can push over by the same amount.
export const PANEL_WIDTH = 320
const HANDLE_WIDTH = 32
// Matches ContentHeader's height (spacing10) -- the panel sits below it, sticky at that offset.
const HEADER_HEIGHT = spacing.spacing10

export interface ActionPlanPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  items: ActionPlanItem[]
  onEditItem: (id: string, summary: string) => void
  onDeleteItem: (id: string) => void
  onSubmit: () => void
}

/**
 * A real layout column, not a lightbox -- opening it makes room in the work
 * area rather than floating over it, same idea as LeftNav (transparent,
 * just a border, no card fill). Sticky under ContentHeader so both stay put
 * while the main content scrolls. Closed by default; the handle on the
 * panel's left edge is the only trigger, fixed so it's never clipped by the
 * panel's own width transition.
 *
 * Controlled (open/onOpenChange) rather than owning its own state, because
 * PromptBar needs to know when it's open too, to push its own right edge over.
 */
export function ActionPlanPanel({
  open,
  onOpenChange,
  title = 'Action plan',
  items,
  onEditItem,
  onDeleteItem,
  onSubmit,
}: ActionPlanPanelProps) {
  return (
    <>
      <button
        type="button"
        className="action-plan-handle"
        aria-label={open ? 'Close action plan' : 'Open action plan'}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        style={{
          position: 'fixed',
          right: open ? PANEL_WIDTH : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: HANDLE_WIDTH,
          height: 64,
          padding: 0,
          border: '0.5px solid var(--border)',
          borderRight: 'none',
          background: 'var(--surface-0)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'right 200ms ease',
          zIndex: 30,
        }}
      >
        {open ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div
        style={{
          width: open ? PANEL_WIDTH : 0,
          flexShrink: 0,
          overflow: 'hidden',
          borderLeft: open ? '0.5px solid var(--border)' : 'none',
          transition: 'width 200ms ease',
          position: 'sticky',
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          zIndex: 30,
        }}
      >
        <div style={{ width: PANEL_WIDTH, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: spacing.spacing05,
              flexShrink: 0,
            }}
          >
            <h2 style={{ margin: 0, ...type.heading02, color: 'var(--text-primary)' }}>{title}</h2>
            <IconButton icon={Close} label="Close" variant="ghost" onClick={() => onOpenChange(false)} />
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              padding: spacing.spacing05,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.spacing03,
            }}
          >
            {items.length === 0 ? (
              <p style={{ margin: 0, ...type.body01, color: 'var(--text-secondary)' }}>
                Approve an action below to add it here.
              </p>
            ) : (
              items.map((item) => (
                <ActionPlanItemCard key={item.id} item={item} onEdit={onEditItem} onDelete={onDeleteItem} />
              ))
            )}
          </div>

          <div style={{ padding: spacing.spacing05, flexShrink: 0 }}>
            <Button variant="primary" onClick={onSubmit} disabled={items.length === 0} style={{ width: '100%' }}>
              Sign and submit
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
