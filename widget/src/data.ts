import type { MigrationEdge, RangeWeeks, Tier } from './types'

export const tiers: Tier[] = [
  { id: 'healthy', label: 'Healthy / low risk', pop: 420, angle: -90 },
  { id: 'at-risk', label: 'At risk', pop: 210, angle: -18 },
  { id: 'rising-risk', label: 'Rising risk', pop: 95, angle: 54 },
  { id: 'high-risk', label: 'High risk', pop: 142, angle: 126, highlight: true },
  { id: 'complex', label: 'Complex / catastrophic', pop: 38, angle: 198 },
]

export const edges: MigrationEdge[] = [
  { id: 'at-risk_high-risk', from: 'at-risk', to: 'high-risk', label: 'At risk → High risk', alert: 34, avg: 9 },
  { id: 'rising-risk_high-risk', from: 'rising-risk', to: 'high-risk', label: 'Rising risk → High risk', alert: 39, avg: 14 },
]

export const rangeMultiplier: Record<RangeWeeks, number> = {
  3: 1,
  6: 1.8,
  12: 3.1,
}
