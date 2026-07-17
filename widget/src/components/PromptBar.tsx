import { useState } from 'react'

const chips = [
  { label: 'Why the jump this window?', prompt: 'Why did more patients than usual move into high risk this window?' },
  { label: 'Which patients moved from at risk?', prompt: 'Which patients moved from at risk to high risk?' },
  { label: 'Compare to last quarter', prompt: 'Compare this window to last quarter.' },
]

interface PromptBarProps {
  onSubmit: (text: string) => void
}

export function PromptBar({ onSubmit }: PromptBarProps) {
  const [value, setValue] = useState('')

  function send(text: string) {
    if (text.trim()) {
      onSubmit(text.trim())
      setValue('')
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
        {chips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onSubmit(chip.prompt)}
            style={{
              fontSize: 12,
              padding: '4px 10px',
              height: 'auto',
              border: '0.5px solid var(--border)',
              borderRadius: 999,
              background: 'transparent',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', borderTop: '0.5px solid var(--border)', paddingTop: 12 }}>
        <input
          placeholder="Ask about this flow..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send(value)
          }}
          style={{ flex: 1 }}
        />
        <button aria-label="Send" onClick={() => send(value)}>
          <i className="ti ti-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}
