export interface Point {
  x: number
  y: number
}

export const CENTER: Point = { x: 190, y: 195 }
export const RING_RADIUS = 115

export function pointOnRing(angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER.x + RING_RADIUS * Math.cos(rad),
    y: CENTER.y + RING_RADIUS * Math.sin(rad),
  }
}

export function bezierPoint(p0: Point, control: Point, p1: Point, t: number): Point {
  const mt = 1 - t
  return {
    x: mt * mt * p0.x + 2 * mt * t * control.x + t * t * p1.x,
    y: mt * mt * p0.y + 2 * mt * t * control.y + t * t * p1.y,
  }
}

export function quadraticPath(p0: Point, control: Point, p1: Point): string {
  return `M ${p0.x.toFixed(1)},${p0.y.toFixed(1)} Q ${control.x},${control.y} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`
}
