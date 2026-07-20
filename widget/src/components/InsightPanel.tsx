import { ChevronLeft, ChevronRight } from '@carbon/icons-react'
import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { spacing, type } from '../tokens'
import { IconButton } from './Button'

const slides = [
  {
    headline: '340 moved to the high risk segment in the past eleven days.',
    detail: 'This is four times the normal.',
  },
  {
    headline: '238 of the new high-risk patients look like a data issue.',
    detail: 'Most share a single site coding change.',
  },
  {
    headline: '73 patients warrant immediate outreach this window.',
    detail: 'That is the residual after quarantine candidates.',
  },
]

export function InsightPanel() {
  const [index, setIndex] = useState(0)
  const count = slides.length

  const panelStyle: CSSProperties = {
    background: 'var(--surface-1)',
    padding: '1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...type.body01,
  }

  function goPrev() {
    setIndex((i) => (i - 1 + count) % count)
  }

  function goNext() {
    setIndex((i) => (i + 1) % count)
  }

  const slide = slides[index]
  const body: ReactNode = (
    <>
      <p style={{ margin: '0 0 12px', ...type.heading03, color: 'var(--text-primary)' }}>{slide.headline}</p>
      <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{slide.detail}</p>
    </>
  )

  return (
    <div style={panelStyle}>
      <div style={{ flex: 1, minHeight: 0 }}>{body}</div>

      <nav
        aria-label="Insight slides"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: spacing.spacing05,
          flexShrink: 0,
        }}
      >
        <IconButton icon={ChevronLeft} label="Previous insight" variant="secondary" onClick={goPrev} />

        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.spacing02 }} role="tablist" aria-label="Slide">
          {slides.map((_, i) => {
            const active = i === index
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Insight ${i + 1}`}
                aria-selected={active}
                onClick={() => setIndex(i)}
                style={{
                  width: active ? 8 : 6,
                  height: active ? 8 : 6,
                  padding: 0,
                  border: 'none',
                  borderRadius: '50%',
                  background: active ? 'var(--text-accent)' : 'var(--border-strong)',
                  cursor: 'pointer',
                  transform: 'none',
                }}
              />
            )
          })}
        </div>

        <IconButton icon={ChevronRight} label="Next insight" variant="secondary" onClick={goNext} />
      </nav>
    </div>
  )
}
