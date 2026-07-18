import { radius, spacing, type } from '../tokens'

interface ToastProps {
  message: string | null
}

export function Toast({ message }: ToastProps) {
  if (!message) return null

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: spacing.spacing10 + spacing.spacing08,
        transform: 'translateX(-50%)',
        background: 'var(--surface-2)',
        border: '0.5px solid var(--border-strong)',
        color: 'var(--text-primary)',
        padding: '10px 16px',
        borderRadius: radius.radius03,
        ...type.helperText01,
        maxWidth: 480,
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  )
}
