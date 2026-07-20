import type { HTMLAttributes } from 'react'
import { radius, spacing } from '../tokens'

export type CardVariant = 'ghost' | 'filled'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'ghost' */
  variant?: CardVariant
}

/**
 * Plain container -- not interactive, not a button. Just a surface to group
 * content on.
 *
 * ghost: no fill (page's own surface-0 shows through), just a 1px border
 * one shade up from it -- --border is Carbon's real "subtle divider against
 * the page" value, already mode-adaptive. (1px, not a spacing token -- our
 * scale starts at 2px, same gap as the chord diagram's stroke widths.)
 *
 * filled: a lighter surface (surface-1), no border -- for tiles that sit
 * within an already-dark context (e.g. next to the chord diagram) and need
 * to read as a step up, not blend into the page.
 */
export function Card({ variant = 'ghost', style, ...props }: CardProps) {
  const variantStyle =
    variant === 'filled'
      ? { background: 'var(--surface-1)' }
      : { background: 'var(--surface-0)', border: '1px solid var(--border)' }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.spacing04,
        borderRadius: radius.radius00,
        padding: spacing.spacing05,
        ...variantStyle,
        ...style,
      }}
      {...props}
    />
  )
}
