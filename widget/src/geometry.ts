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

/**
 * Cubic bezier with both control points pulled toward a shared waypoint,
 * matching the reference Figma export's curve character: straighter near
 * each node, with the actual bend concentrated in the middle -- not one
 * continuous even arc like a single quadratic curve produces.
 *
 * The first attempt at this used a two-segment path with linear-interpolated
 * control points, which was a bug: a control point that's a straight
 * interpolation between a segment's own two endpoints is, by definition, ON
 * the line between them -- a bezier with both controls collinear with its
 * endpoints renders as a dead-straight line, not a curve. Pulling both
 * control points toward one shared waypoint instead works because they sit
 * on two *different* lines (p0->waypoint and p1->waypoint), which is what
 * actually produces curvature.
 */
export function bentPath(p0: Point, waypoint: Point, p1: Point, pull = 0.8): string {
  const c1: Point = {
    x: p0.x + pull * (waypoint.x - p0.x),
    y: p0.y + pull * (waypoint.y - p0.y),
  }
  const c2: Point = {
    x: p1.x + pull * (waypoint.x - p1.x),
    y: p1.y + pull * (waypoint.y - p1.y),
  }
  return (
    `M ${p0.x.toFixed(1)},${p0.y.toFixed(1)} ` +
    `C ${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`
  )
}
