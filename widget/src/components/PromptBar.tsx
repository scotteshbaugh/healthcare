import { useState } from 'react'
import { ModelSelector, ModelSelectorTrigger, type ModelOption } from './elements/model-selector'
import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar, PromptInputTools } from './elements/prompt-input'

const riskModels: ModelOption[] = [
  { id: 'lace', label: 'LACE Index', group: 'Claims-based', description: 'readmission risk' },
  { id: 'hcc', label: 'HCC Risk Adjustment', group: 'Claims-based', description: 'CMS-HCC' },
  { id: 'acg', label: 'Johns Hopkins ACG', group: 'Claims-based', description: 'population morbidity' },
  { id: 'xgb', label: 'Custom XGBoost v3', group: 'ML models', description: 'internal' },
]

export function PromptBar() {
  const [modelOpen, setModelOpen] = useState(false)
  const [model, setModel] = useState('lace')

  return (
    <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: 12 }}>
      <PromptInput onSubmit={() => {}}>
        <PromptInputTextarea placeholder="Ask about this flow..." />
        <PromptInputToolbar>
          <PromptInputTools>
            <ModelSelectorTrigger value={model} options={riskModels} onClick={() => setModelOpen(true)} />
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
  )
}
