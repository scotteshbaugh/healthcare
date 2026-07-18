import { ChevronDown, Dashboard, Folder, OverflowMenuHorizontal, Search, SidePanelClose, Star } from '@carbon/icons-react'
import type { CarbonIconType } from '@carbon/icons-react'
import { useState } from 'react'
import { radius, spacing, type } from '../tokens'
import './left-nav.css'

const navItems: { label: string; icon: CarbonIconType }[] = [
  { label: 'Mosaic', icon: Dashboard },
  { label: 'Projects', icon: Folder },
  { label: 'Starred', icon: Star },
  { label: 'More', icon: OverflowMenuHorizontal },
]

// Dummy data -- a population-health analyst's recent sessions in this tool.
const recentConversations = [
  'High-risk migration review — wk 29',
  'LACE model drift investigation',
  'Quarantine: 2 flagged sites',
  'Q2 readmission cohort comparison',
  'Rising risk outreach follow-up',
  'HCC risk score audit',
]

function IconButton({ icon: Icon, label }: { icon: CarbonIconType; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="nav-icon-btn"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        padding: 0,
        border: '0.5px solid var(--border-strong)',
        borderRadius: radius.radius03,
        background: 'transparent',
        color: 'var(--text-primary)',
        cursor: 'pointer',
      }}
    >
      <Icon size={16} />
    </button>
  )
}

function NavRow({ icon: Icon, label }: { icon: CarbonIconType; label: string }) {
  return (
    <button
      type="button"
      className="nav-row"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.spacing03,
        height: 32,
        padding: `0 ${spacing.spacing03}px`,
        border: 'none',
        borderRadius: radius.radius03,
        background: 'transparent',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        ...type.body01,
      }}
    >
      <Icon size={20} />
      {label}
    </button>
  )
}

export function LeftNav() {
  const [recentsOpen, setRecentsOpen] = useState(true)

  return (
    <div
      style={{
        width: 256,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.spacing06,
        padding: spacing.spacing05,
        borderRight: '0.5px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, ...type.heading04, color: 'var(--text-primary)' }}>HF Health</h1>
        <div style={{ display: 'flex', gap: spacing.spacing02 }}>
          <IconButton icon={Search} label="Search" />
          <IconButton icon={SidePanelClose} label="Toggle sidebar" />
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing01 }}>
        {navItems.map((item) => (
          <NavRow key={item.label} icon={item.icon} label={item.label} />
        ))}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing01 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${spacing.spacing03}px` }}>
          <span style={{ ...type.headingCompact01, color: 'var(--text-primary)' }}>Recents</span>
          <button
            type="button"
            className="nav-icon-btn"
            aria-label={recentsOpen ? 'Collapse recents' : 'Expand recents'}
            aria-expanded={recentsOpen}
            onClick={() => setRecentsOpen((open) => !open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              padding: 0,
              border: 'none',
              borderRadius: radius.radius03,
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transform: recentsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.15s ease',
            }}
          >
            <ChevronDown size={16} />
          </button>
        </div>

        {recentsOpen && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentConversations.map((title) => (
              <button
                key={title}
                type="button"
                className="nav-row"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  borderRadius: radius.radius03,
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: `${spacing.spacing02}px ${spacing.spacing03}px`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ...type.body01,
                }}
              >
                {title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
