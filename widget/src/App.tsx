import { useEffect, useRef, useState } from 'react'
import { ActionBar } from './components/ActionBar'
import { ActionPlanPanel } from './components/ActionPlanPanel'
import { ContentHeader } from './components/ContentHeader'
import { LeftNav } from './components/LeftNav'
import { MigrationReview } from './components/MigrationReview'
import { PromptBar } from './components/PromptBar'
import { Toast } from './components/Toast'
import { spacing } from './tokens'
import type { ActionPlanItem } from './types'

function App() {
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const [planOpen, setPlanOpen] = useState(false)
  const [planItems, setPlanItems] = useState<ActionPlanItem[]>([])

  function showToast(message: string) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  function addToPlan(item: ActionPlanItem) {
    setPlanItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]))
    setPlanOpen(true)
  }

  function editPlanItem(id: string, summary: string) {
    setPlanItems((prev) => prev.map((i) => (i.id === id ? { ...i, summary } : i)))
  }

  function deletePlanItem(id: string) {
    setPlanItems((prev) => prev.filter((i) => i.id !== id))
  }

  function submitPlan() {
    showToast('Action plan signed and submitted')
    setPlanItems([])
    setPlanOpen(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <LeftNav />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <ContentHeader title="Review 238 patients. The AI could not confidently explain their move to High Risk. Manual validation may save $60K." />

        <div style={{ flex: 1, minWidth: 0, display: 'flex' }}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              maxWidth: 1080,
              width: '100%',
              margin: '0 auto',
              padding: `${spacing.spacing04}px`,
              paddingBottom: spacing.spacing10 + spacing.spacing08,
            }}
          >
            <MigrationReview />
            <ActionBar planItemIds={new Set(planItems.map((i) => i.id))} onAddToPlan={addToPlan} />
            <PromptBar panelOpen={planOpen} />
            <Toast message={toast} />
          </div>

          <ActionPlanPanel
            open={planOpen}
            onOpenChange={setPlanOpen}
            items={planItems}
            onEditItem={editPlanItem}
            onDeleteItem={deletePlanItem}
            onSubmit={submitPlan}
          />
        </div>
      </div>
    </div>
  )
}

export default App
