import type { MigrationEdge, Tier } from './types'

// Baseline segments, roughly 40,000 -- shaped like real counts, not round ones.
export const tiers: Tier[] = [
  { id: 'healthy', label: 'Low risk', pop: 26422, angle: -90 },
  { id: 'at-risk', label: 'At risk', pop: 6743, angle: -18 },
  { id: 'rising-risk', label: 'Rising risk', pop: 3958, angle: 54 },
  { id: 'high-risk', label: 'High risk', pop: 2411, angle: 126, highlight: true },
  { id: 'complex', label: 'Complex', pop: 386, angle: 198 },
]

export const edges: MigrationEdge[] = [
  { id: 'at-risk_high-risk', from: 'at-risk', to: 'high-risk', label: 'At risk → High risk', alert: 34, avg: 9 },
  { id: 'rising-risk_high-risk', from: 'rising-risk', to: 'high-risk', label: 'Rising risk → High risk', alert: 39, avg: 14 },
]
