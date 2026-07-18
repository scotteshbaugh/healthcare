/**
 * Ported from vercel/ai-elements (packages/elements/src/message.tsx).
 * Original renders `from: UIMessage["role"]` and pipes content through
 * Streamdown (a full streaming-markdown renderer with cjk/code/math/mermaid
 * plugins) plus a branch-switcher for multiple regenerated responses. This
 * project has no live model responses to stream or branch, so MessageContent
 * just renders children directly -- same role-based bubble alignment
 * (assistant left-aligned plain text, user right-aligned in a filled bubble)
 * without the markdown/branching machinery.
 */
import type { HTMLAttributes } from 'react'
import { radius, spacing, type } from '../../tokens'

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  from: 'user' | 'assistant'
}

export const Message = ({ from, style, ...props }: MessageProps) => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      maxWidth: '95%',
      flexDirection: 'column',
      gap: spacing.spacing02,
      marginLeft: from === 'user' ? 'auto' : undefined,
      alignItems: from === 'user' ? 'flex-end' : 'flex-start',
      ...style,
    }}
    {...props}
  />
)

export interface MessageContentProps extends HTMLAttributes<HTMLDivElement> {
  from?: 'user' | 'assistant'
}

export const MessageContent = ({ from, style, ...props }: MessageContentProps) => (
  <div
    style={{
      width: 'fit-content',
      minWidth: 0,
      maxWidth: '100%',
      ...type.body01,
      color: 'var(--text-primary)',
      ...(from === 'user'
        ? { borderRadius: radius.radius03, background: 'var(--surface-1)', padding: `${spacing.spacing03}px ${spacing.spacing04}px` }
        : {}),
      ...style,
    }}
    {...props}
  />
)
