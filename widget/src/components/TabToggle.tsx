import type { Mode } from '../types'

interface TabToggleProps {
  mode: Mode
  onChange: (mode: Mode) => void
}

export function TabToggle({ mode, onChange }: TabToggleProps) {
  return (
    <div style={{ display: 'flex', border: '0.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <button
        onClick={() => onChange('alert')}
        style={{
          fontSize: 13,
          padding: '6px 14px',
          height: 'auto',
          border: 'none',
          borderRadius: 0,
          background: mode === 'alert' ? 'var(--surface-1)' : 'transparent',
          color: mode === 'alert' ? 'var(--text-accent)' : 'var(--text-secondary)',
          fontWeight: mode === 'alert' ? 500 : 400,
        }}
      >
        Alert window
      </button>
      <button
        onClick={() => onChange('avg')}
        style={{
          fontSize: 13,
          padding: '6px 14px',
          height: 'auto',
          border: 'none',
          borderRadius: 0,
          background: mode === 'avg' ? 'var(--surface-1)' : 'transparent',
          color: mode === 'avg' ? 'var(--text-accent)' : 'var(--text-secondary)',
          fontWeight: mode === 'avg' ? 500 : 400,
        }}
      >
        Average
      </button>
    </div>
  )
}
