import { useEffect, useRef, useState } from 'react'
import { ActionBar } from './components/ActionBar'
import { LeftNav } from './components/LeftNav'
import { MigrationReview } from './components/MigrationReview'
import { PromptBar } from './components/PromptBar'
import { Toast } from './components/Toast'
import { spacing, type } from './tokens'

function App() {
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  function showToast(message: string) {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <LeftNav />

      <div style={{ flex: 1, maxWidth: 960, margin: '0 auto', padding: `${spacing.spacing04}px` }}>
        <h2 className="sr-only">Test</h2>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ margin: '0 0 4px', ...type.heading02 }}>
            340 patients moved to high risk, 238 of them look like a data issue
          </h2>
          <p style={{ margin: 0, ...type.helperText01, color: 'var(--text-secondary)' }}>past 11 days</p>
        </div>

        <MigrationReview />

        <ActionBar onAction={showToast} />
        <PromptBar />
        <Toast message={toast} />
      </div>
    </div>
  )
}

export default App
