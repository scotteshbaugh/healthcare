export type TierId = 'healthy' | 'at-risk' | 'rising-risk' | 'high-risk' | 'complex'

export interface Tier {
  id: TierId
  label: string
  pop: number
  angle: number
  highlight?: boolean
  /** Net change this window. Omitted where there's no movement to report (e.g. Low risk, Catastrophic). */
  netMovement?: number
}

export interface MigrationEdge {
  id: string
  from: TierId
  to: TierId
  label: string
  alert: number
  avg: number
}

/** A committed action awaiting sign-off, shown as a card in the Action plan panel. */
export interface ActionPlanItem {
  id: string
  title: string
  summary: string
}
