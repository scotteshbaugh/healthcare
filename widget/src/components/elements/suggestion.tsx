/**
 * Ported from vercel/ai-elements (packages/elements/src/suggestion.tsx).
 * Original built on shadcn's Button + ScrollArea (Tailwind + Radix). Rebuilt
 * here as plain elements styled with this project's own tokens.
 */
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { radius, spacing, type } from '../../tokens'

export type SuggestionsProps = HTMLAttributes<HTMLDivElement>

export const Suggestions = ({ style, children, ...props }: SuggestionsProps) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      gap: spacing.spacing02,
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      scrollbarWidth: 'none',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)

export interface SuggestionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  suggestion: string
  onClick?: (suggestion: string) => void
}

export const Suggestion = ({ suggestion, onClick, style, children, ...props }: SuggestionProps) => (
  <button
    type="button"
    onClick={() => onClick?.(suggestion)}
    style={{
      flexShrink: 0,
      height: 'auto',
      padding: `${spacing.spacing02}px ${spacing.spacing04}px`,
      borderRadius: radius.full,
      border: '0.5px solid var(--border)',
      background: 'transparent',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      ...type.label01,
      ...style,
    }}
    {...props}
  >
    {children || suggestion}
  </button>
)
