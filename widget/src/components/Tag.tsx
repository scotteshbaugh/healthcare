import type { HTMLAttributes, ReactNode } from 'react'
import { radius, spacing, type } from '../tokens'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function Tag({ children, style, ...props }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        height: spacing.spacing06,
        padding: `0 ${spacing.spacing03}px`,
        borderRadius: radius.full,
        background: 'var(--orange-30)',
        color: 'var(--orange-80)',
        ...type.label01,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
