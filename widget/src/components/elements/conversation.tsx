/**
 * Ported from vercel/ai-elements (packages/elements/src/conversation.tsx).
 * Kept `use-stick-to-bottom` as a real dependency -- it's headless (no
 * Tailwind) and auto-scroll-to-bottom-with-resize-detection is genuinely
 * fiddly to get right, not worth reimplementing. Dropped ConversationDownload
 * (markdown export of UIMessage[]) -- this project doesn't have UIMessage
 * data, just plain strings.
 */
import { ArrowDown } from '@carbon/icons-react'
import type { HTMLAttributes, ReactNode } from 'react'
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom'
import { spacing, type } from '../../tokens'
import { IconButton } from '../Button'

export type ConversationProps = Parameters<typeof StickToBottom>[0]

export const Conversation = ({ style, ...props }: ConversationProps) => (
  <StickToBottom
    style={{ position: 'relative', flex: 1, overflowY: 'hidden', ...style }}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
)

export type ConversationContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
}

export const ConversationContent = ({ style, ...props }: ConversationContentProps) => (
  <StickToBottom.Content style={{ display: 'flex', flexDirection: 'column', gap: spacing.spacing06, padding: spacing.spacing04, ...style }} {...props} />
)

export interface ConversationEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: ReactNode
}

export const ConversationEmptyState = ({
  title = 'No messages yet',
  description = 'Start a conversation to see messages here',
  icon,
  style,
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.spacing03,
      padding: spacing.spacing07,
      textAlign: 'center',
      ...style,
    }}
    {...props}
  >
    {children ?? (
      <>
        {icon && <div style={{ color: 'var(--text-secondary)' }}>{icon}</div>}
        <div>
          <h3 style={{ margin: 0, ...type.label01, color: 'var(--text-primary)' }}>{title}</h3>
          {description && <p style={{ margin: '4px 0 0', ...type.helperText01, color: 'var(--text-secondary)' }}>{description}</p>}
        </div>
      </>
    )}
  </div>
)

export const ConversationScrollButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  if (isAtBottom) return null

  return (
    <IconButton
      icon={ArrowDown}
      label="Scroll to bottom"
      variant="secondary"
      onClick={() => scrollToBottom()}
      style={{
        position: 'absolute',
        bottom: spacing.spacing04,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      {...props}
    />
  )
}
