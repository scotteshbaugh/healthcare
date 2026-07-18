export type TierId = 'healthy' | 'at-risk' | 'rising-risk' | 'high-risk' | 'complex'

export interface Tier {
  id: TierId
  label: string
  pop: number
  angle: number
  highlight?: boolean
}

export interface MigrationEdge {
  id: string
  from: TierId
  to: TierId
  label: string
  alert: number
  avg: number
}
