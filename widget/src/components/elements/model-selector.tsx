/**
 * Ported from vercel/ai-elements (packages/elements/src/model-selector.tsx).
 * Original is a thin wrapper around shadcn's Command + Dialog (which
 * themselves wrap cmdk + Radix Dialog) with a hardcoded list of AI-provider
 * logos. Rebuilt here on cmdk directly (see command.css for its styling) as
 * a generic searchable picker -- this project has no AI-provider routing,
 * so the provider-logo union type is dropped in favor of a plain options list
 * the caller supplies (e.g. risk-stratification models, not AI models).
 */
import { Checkmark, ChevronDown } from '@carbon/icons-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk'
import type { ReactNode } from 'react'
import { radius, spacing, type } from '../../tokens'
import { Button } from '../Button'
import './command.css'

export interface ModelOption {
  id: string
  label: string
  description?: string
  group?: string
}

export interface ModelSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  options: ModelOption[]
  value?: string
  onSelect: (id: string) => void
  placeholder?: string
  emptyState?: ReactNode
  title?: string
}

export function ModelSelector({
  open,
  onOpenChange,
  options,
  value,
  onSelect,
  placeholder = 'Search models...',
  emptyState = 'No matches.',
  title = 'Model selector',
}: ModelSelectorProps) {
  const groups = Array.from(new Set(options.map((o) => o.group ?? '')))

  return (
    <Command.Dialog open={open} onOpenChange={onOpenChange} label={title}>
      <CommandInput
        placeholder={placeholder}
        style={{
          width: '100%',
          height: 'auto',
          padding: spacing.spacing04,
          border: 'none',
          borderBottom: '0.5px solid var(--border)',
          background: 'transparent',
          color: 'var(--text-primary)',
          outline: 'none',
          ...type.body01,
        }}
      />
      <CommandList>
        <CommandEmpty style={{ padding: spacing.spacing04, color: 'var(--text-secondary)', ...type.body01 }}>
          {emptyState}
        </CommandEmpty>
        {groups.map((group, i) => (
          <div key={group || 'ungrouped'}>
            {i > 0 && <CommandSeparator />}
            <CommandGroup
              heading={group || undefined}
              style={{ padding: spacing.spacing02 }}
            >
              {options
                .filter((o) => (o.group ?? '') === group)
                .map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => {
                      onSelect(option.id)
                      onOpenChange(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.spacing02,
                      padding: `${spacing.spacing03}px ${spacing.spacing03}px`,
                      borderRadius: radius.radius03,
                      color: 'var(--text-primary)',
                      ...type.body01,
                    }}
                  >
                    <span style={{ width: 16, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                      {value === option.id && <Checkmark size={14} style={{ color: 'var(--text-accent)' }} />}
                    </span>
                    <span style={{ flex: 1, textAlign: 'left' }}>{option.label}</span>
                    {option.description && (
                      <span style={{ ...type.helperText01, color: 'var(--text-secondary)' }}>{option.description}</span>
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </Command.Dialog>
  )
}

export interface ModelSelectorTriggerProps {
  value?: string
  options: ModelOption[]
  onClick: () => void
  placeholder?: string
}

export function ModelSelectorTrigger({ value, options, onClick, placeholder = 'Select model' }: ModelSelectorTriggerProps) {
  const selected = options.find((o) => o.id === value)
  return (
    <Button variant="ghost" icon={ChevronDown} onClick={onClick}>
      {selected ? selected.label : placeholder}
    </Button>
  )
}
