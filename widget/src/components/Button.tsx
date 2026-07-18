import type { CarbonIconType } from '@carbon/icons-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { type } from '../tokens'
import './button.css'

/** Visual style — primary (filled brand), secondary (surface), ghost (no fill). */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

function btnClass(variant: ButtonVariant, iconOnly: boolean, className?: string) {
  return ['btn', `btn--${variant}`, iconOnly ? 'btn--icon' : null, className].filter(Boolean).join(' ')
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: CarbonIconType
  /** Accessible name — required because the button has no visible text. */
  label: string
  /** @default 'ghost' */
  variant?: ButtonVariant
  iconSize?: number
}

/** Square icon-only button. */
export function IconButton({
  icon: Icon,
  label,
  variant = 'ghost',
  iconSize = 16,
  disabled,
  className,
  style,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      disabled={disabled}
      className={btnClass(variant, true, className)}
      style={style}
      {...props}
    >
      <Icon size={iconSize} aria-hidden="true" />
    </button>
  )
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  /** @default 'ghost' */
  variant?: ButtonVariant
  icon?: CarbonIconType
  /** @default 'end' */
  iconPosition?: 'start' | 'end'
  iconSize?: number
}

/** Text button, optionally with a leading or trailing icon. */
export function Button({
  children,
  variant = 'ghost',
  icon: Icon,
  iconPosition = 'end',
  iconSize = 16,
  disabled,
  className,
  style,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={btnClass(variant, false, className)}
      style={{ ...type.label01, ...style }}
      {...props}
    >
      {Icon && iconPosition === 'start' && <Icon size={iconSize} aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'end' && <Icon size={iconSize} aria-hidden="true" />}
    </button>
  )
}
