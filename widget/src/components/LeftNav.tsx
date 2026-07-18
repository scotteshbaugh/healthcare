import { ChevronDown, DataVis_4, Folder, OverflowMenuHorizontal, Search, SidePanelClose, Star } from '@carbon/icons-react'
import type { CarbonIconType } from '@carbon/icons-react'
import { useState } from 'react'
import { radius, spacing, type } from '../tokens'
import { IconButton } from './Button'
import './left-nav.css'

const navItems: { label: string; icon: CarbonIconType }[] = [
  { label: 'Mosaic', icon: DataVis_4 },
  { label: 'Projects', icon: Folder },
  { label: 'Starred', icon: Star },
  { label: 'More', icon: OverflowMenuHorizontal },
]

// Dummy data -- a population-health analyst's recent sessions in this tool.
const recentConversations = [
  'Review 238 patients. The AI could not confidently explain their move to High Risk. Manual validation may save $60K.',
  'LACE model drift investigation',
  'Quarantine: 2 flagged sites',
  'Q2 readmission cohort comparison',
  'Rising risk outreach follow-up',
  'HCC risk score audit',
]

const activeConversation = recentConversations[0]

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
          <IconButton icon={Search} label="Search" className="nav-icon-btn" />
          <IconButton icon={SidePanelClose} label="Toggle sidebar" className="nav-icon-btn" />
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
          <IconButton
            icon={ChevronDown}
            label={recentsOpen ? 'Collapse recents' : 'Expand recents'}
            className="nav-icon-btn"
            aria-expanded={recentsOpen}
            onClick={() => setRecentsOpen((open) => !open)}
            style={{
              width: 24,
              height: 24,
              border: 'none',
              color: 'var(--text-secondary)',
              transform: recentsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.15s ease',
            }}
          />
        </div>

        {recentsOpen && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recentConversations.map((title) => {
              const isActive = title === activeConversation
              return (
                <button
                  key={title}
                  type="button"
                  className="nav-row"
                  aria-current={isActive ? 'page' : undefined}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    borderRadius: radius.radius03,
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
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
