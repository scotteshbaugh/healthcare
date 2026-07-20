import { Attachment } from '@carbon/icons-react'
import { useState } from 'react'
import { spacing } from '../tokens'
import { PANEL_WIDTH } from './ActionPlanPanel'
import { IconButton } from './Button'
import { ModelSelector, ModelSelectorTrigger, type ModelOption } from './elements/model-selector'
import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar, PromptInputTools } from './elements/prompt-input'

const riskModels: ModelOption[] = [
  { id: 'lace', label: 'LACE Index', group: 'Claims-based', description: 'readmission risk' },
  { id: 'hcc', label: 'HCC Risk Adjustment', group: 'Claims-based', description: 'CMS-HCC' },
  { id: 'acg', label: 'Johns Hopkins ACG', group: 'Claims-based', description: 'population morbidity' },
  { id: 'xgb', label: 'Custom XGBoost v3', group: 'ML models', description: 'internal' },
]

/** Matches LeftNav width so the fixed bar lines up with the main column. */
const NAV_WIDTH = 256

export interface PromptBarProps {
  /** Whether ActionPlanPanel is open -- pushes this bar's right edge over by the same amount. */
  panelOpen?: boolean
}

export function PromptBar({ panelOpen = false }: PromptBarProps) {
  const [modelOpen, setModelOpen] = useState(false)
  const [model, setModel] = useState('lace')

  return (
    <div
      style={{
        position: 'fixed',
        bottom: spacing.spacing08,
        left: NAV_WIDTH,
        right: panelOpen ? PANEL_WIDTH : 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: `0 ${spacing.spacing04}px`,
        pointerEvents: 'none',
        transition: 'right 200ms ease',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1080, pointerEvents: 'auto' }}>
        <PromptInput onSubmit={() => {}}>
          <PromptInputTextarea placeholder="Ask anything..." />
          <PromptInputToolbar>
            <PromptInputTools>
              <ModelSelectorTrigger value={model} options={riskModels} onClick={() => setModelOpen(true)} />
              <span
                aria-hidden
                style={{
                  width: 1,
                  alignSelf: 'stretch',
                  background: 'var(--border)',
                  flexShrink: 0,
                }}
              />
              <IconButton icon={Attachment} label="Attach file" variant="secondary" />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputToolbar>
        </PromptInput>

        <ModelSelector
          open={modelOpen}
          onOpenChange={setModelOpen}
          options={riskModels}
          value={model}
          onSelect={setModel}
          placeholder="Search risk models..."
          title="Select risk model"
        />
      </div>
    </div>
  )
}
