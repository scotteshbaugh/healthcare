/**
 * Ported from vercel/ai-elements (packages/elements/src/prompt-input.tsx).
 * The original is 1,400+ lines: attachments, screenshots, action menus,
 * hover cards, tabs, an embedded command palette, referenced sources -- all
 * built around a provider that assumes a live AI SDK backend streaming
 * FileUIPart/ChatStatus. This project has no backend to stream from, so only
 * the pieces that make sense for a plain text prompt bar are ported: the
 * form wrapper, the auto-resizing textarea (Enter submits, Shift+Enter for a
 * newline, guards against IME composition and a disabled submit button),
 * the toolbar row, and a status-aware submit button.
 */
import { Close, Return, Stop } from '@carbon/icons-react'
import type { FormEvent, FormHTMLAttributes, HTMLAttributes, KeyboardEvent, TextareaHTMLAttributes } from 'react'
import { useCallback, useState } from 'react'
import { radius, spacing, type } from '../../tokens'
import { IconButton } from '../Button'

export type PromptInputStatus = 'idle' | 'submitted' | 'streaming' | 'error'

export interface PromptInputProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (text: string, event: FormEvent<HTMLFormElement>) => void
}

export const PromptInput = ({ onSubmit, style, children, ...props }: PromptInputProps) => {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const text = String(formData.get('message') ?? '').trim()
      if (!text) return
      onSubmit(text, event)
    },
    [onSubmit],
  )

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.spacing01,
        border: 'none',
        background: 'transparent',
        ...style,
      }}
      {...props}
    >
      {children}
    </form>
  )
}

export type PromptInputTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const PromptInputTextarea = ({
  onKeyDown,
  placeholder = 'What would you like to know?',
  style,
  ...props
}: PromptInputTextareaProps) => {
  const [isComposing, setIsComposing] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(e)
      if (e.defaultPrevented) return

      if (e.key === 'Enter' && !e.shiftKey && !isComposing && !e.nativeEvent.isComposing) {
        e.preventDefault()
        const { form } = e.currentTarget
        const submitButton = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null
        if (submitButton?.disabled) return
        form?.requestSubmit()
      }
    },
    [onKeyDown, isComposing],
  )

  return (
    <textarea
      name="message"
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
      style={{
        width: '100%',
        minHeight: 64,
        maxHeight: 192,
        fieldSizing: 'content',
        resize: 'none',
        border: '0.5px solid var(--border)',
        borderRadius: radius.radius00,
        background: 'var(--surface-2)',
        color: 'var(--text-primary)',
        outline: 'none',
        padding: spacing.spacing04,
        ...type.body01,
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  )
}

export const PromptInputToolbar = ({ style, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.spacing02,
      padding: spacing.spacing02,
      border: '0.5px solid var(--border)',
      borderRadius: radius.radius00,
      background: 'var(--surface-2)',
      ...style,
    }}
    {...props}
  />
)

export const PromptInputTools = ({ style, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.spacing02, minWidth: 0, ...style }} {...props} />
)

export interface PromptInputSubmitProps extends HTMLAttributes<HTMLButtonElement> {
  status?: PromptInputStatus
  disabled?: boolean
  onStop?: () => void
}

export const PromptInputSubmit = ({ status = 'idle', disabled, onStop, onClick, style, ...props }: PromptInputSubmitProps) => {
  const isGenerating = status === 'submitted' || status === 'streaming'
  const icon = status === 'streaming' ? Stop : status === 'error' ? Close : Return

  return (
    <IconButton
      icon={icon}
      label={isGenerating ? 'Stop' : 'Submit'}
      variant="secondary"
      type={isGenerating && onStop ? 'button' : 'submit'}
      disabled={disabled}
      onClick={(e) => {
        if (isGenerating && onStop) {
          e.preventDefault()
          onStop()
          return
        }
        onClick?.(e)
      }}
      style={{
        ...(status === 'submitted' ? { opacity: 0.5 } : {}),
        ...style,
      }}
      {...props}
    />
  )
}
