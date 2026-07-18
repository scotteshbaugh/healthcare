import { spacing, type } from '../tokens'
import { Tag } from './Tag'

interface ContentHeaderProps {
  title: string
}

export function ContentHeader({ title }: ContentHeaderProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        height: spacing.spacing10,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.spacing04,
        padding: `0 ${spacing.spacing05}px`,
        background: 'var(--surface-0)',
        borderBottom: '0.5px solid var(--border)',
        flexShrink: 0,
      }}
    >
      <Tag>Needs human review</Tag>
      <h2
        style={{
          margin: 0,
          ...type.heading02,
          color: 'var(--text-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h2>
    </header>
  )
}
