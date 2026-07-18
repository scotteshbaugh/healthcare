/**
 * Ported from vercel/ai-elements (packages/elements/src/confirmation.tsx).
 * Original state shape is an AI-SDK ToolUIPart approval machine
 * ("input-streaming" | "approval-requested" | "output-denied" | ...).
 * This project has no live tool-call backend, so the state is simplified to
 * "pending" | "accepted" | "rejected" -- same compound-component pattern
 * (a context gates which children render), same accept/reject UX.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { radius, spacing, type } from '../../tokens'

export type ConfirmationState = 'pending' | 'accepted' | 'rejected'

const ConfirmationContext = createContext<ConfirmationState | null>(null)

function useConfirmation() {
  const state = useContext(ConfirmationContext)
  if (state === null) {
    throw new Error('Confirmation components must be used within Confirmation')
  }
  return state
}

export interface ConfirmationProps extends HTMLAttributes<HTMLDivElement> {
  state: ConfirmationState
}

export const Confirmation = ({ state, style, ...props }: ConfirmationProps) => {
  const toneVar = state === 'accepted' ? '--border-success' : state === 'rejected' ? '--border-warning' : '--border'
  return (
    <ConfirmationContext.Provider value={state}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.spacing02,
          padding: spacing.spacing04,
          borderRadius: radius.radius03,
          border: `0.5px solid var(${toneVar})`,
          background: 'var(--surface-1)',
          ...style,
        }}
        {...props}
      />
    </ConfirmationContext.Provider>
  )
}

export const ConfirmationTitle = ({ style, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p style={{ margin: 0, ...type.body01, color: 'var(--text-primary)', ...style }} {...props} />
)

export const ConfirmationRequest = ({ children }: { children?: ReactNode }) => {
  const state = useConfirmation()
  if (state !== 'pending') return null
  return children
}

export const ConfirmationAccepted = ({ children }: { children?: ReactNode }) => {
  const state = useConfirmation()
  if (state !== 'accepted') return null
  return children
}

export const ConfirmationRejected = ({ children }: { children?: ReactNode }) => {
  const state = useConfirmation()
  if (state !== 'rejected') return null
  return children
}

export const ConfirmationActions = ({ style, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const state = useConfirmation()
  if (state !== 'pending') return null
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.spacing02, ...style }}
      {...props}
    />
  )
}

export interface ConfirmationActionProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'accept' | 'reject'
}

export const ConfirmationAction = ({ variant, style, ...props }: ConfirmationActionProps) => (
  <button
    type="button"
    style={{
      height: 32,
      padding: `0 ${spacing.spacing04}px`,
      borderRadius: radius.radius03,
      border: `0.5px solid ${variant === 'accept' ? 'var(--border-accent)' : 'var(--border-strong)'}`,
      background: 'transparent',
      color: variant === 'accept' ? 'var(--text-accent)' : 'var(--text-primary)',
      cursor: 'pointer',
      ...type.label01,
      ...style,
    }}
    {...props}
  />
)
