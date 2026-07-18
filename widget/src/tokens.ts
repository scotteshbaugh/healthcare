/**
 * Design tokens sourced from IBM Carbon Design System.
 * Values pulled directly from the published packages, not re-derived:
 *   spacing / type scale — @carbon/layout@11.55.0, @carbon/type@11.63.0
 *   https://carbondesignsystem.com/elements/spacing/overview/
 *   https://carbondesignsystem.com/elements/typography/overview/
 *
 * This project does not use Carbon's React components or IBM Plex —
 * only the numeric scale, so spacing/type stay consistent without
 * pulling in the full library.
 */

// Carbon's spacing scale (@carbon/layout $spacing-01..13), converted from rem to px at a 16px root.
export const spacing = {
  spacing01: 2,
  spacing02: 4,
  spacing03: 8,
  spacing04: 12,
  spacing05: 16,
  spacing06: 24,
  spacing07: 32,
  spacing08: 40,
  spacing09: 48,
  spacing10: 64,
  spacing11: 80,
  spacing12: 96,
  spacing13: 160,
} as const

// Carbon has no separate corner-radius scale -- border-radius reuses the spacing
// scale itself (verified against @carbon/styles' compiled CSS: every non-pill
// radius Carbon ships is one of the spacing steps below, not a distinct token set).
export const radius = {
  // Not a scale step either -- sharp corners, needed as often as rounded ones.
  radius00: 0,
  radius01: spacing.spacing01, // 2
  radius02: spacing.spacing02, // 4
  radius03: spacing.spacing03, // 8
  radius04: spacing.spacing04, // 12
  radius05: spacing.spacing05, // 16
  // Not a scale step -- the standard "fully round" idiom for pill shapes.
  full: 999,
} as const

// Carbon's type scale (@carbon/type get-type-size formula, steps 1-12), in px.
export const typeScale = {
  step01: 12,
  step02: 14,
  step03: 16,
  step04: 18,
  step05: 20,
  step06: 24,
  step07: 28,
  step08: 32,
  step09: 36,
  step10: 42,
  step11: 48,
  step12: 54,
} as const

export const fontWeight = {
  light: 300,
  regular: 400,
  semibold: 600,
} as const

interface TypeStyle {
  fontSize: number
  lineHeight: number
  letterSpacing: number
  fontWeight: number
}

// Carbon's named type tokens (@carbon/type _styles.scss), the ones relevant to a dense data UI.
// Naming matches Carbon's own token names so it's greppable against their docs.
export const type = {
  label01: { fontSize: typeScale.step01, lineHeight: 1.33333, letterSpacing: 0.32, fontWeight: fontWeight.regular },
  label02: { fontSize: typeScale.step02, lineHeight: 1.28572, letterSpacing: 0.16, fontWeight: fontWeight.regular },
  helperText01: { fontSize: typeScale.step01, lineHeight: 1.33333, letterSpacing: 0.32, fontWeight: fontWeight.regular },
  bodyCompact01: { fontSize: typeScale.step02, lineHeight: 1.28572, letterSpacing: 0.16, fontWeight: fontWeight.regular },
  body01: { fontSize: typeScale.step02, lineHeight: 1.42857, letterSpacing: 0.16, fontWeight: fontWeight.regular },
  bodyCompact02: { fontSize: typeScale.step03, lineHeight: 1.375, letterSpacing: 0, fontWeight: fontWeight.regular },
  body02: { fontSize: typeScale.step03, lineHeight: 1.5, letterSpacing: 0, fontWeight: fontWeight.regular },
  code01: { fontSize: typeScale.step01, lineHeight: 1.33333, letterSpacing: 0.32, fontWeight: fontWeight.regular },
  code02: { fontSize: typeScale.step02, lineHeight: 1.42857, letterSpacing: 0.32, fontWeight: fontWeight.regular },
  headingCompact01: { fontSize: typeScale.step02, lineHeight: 1.28572, letterSpacing: 0.16, fontWeight: fontWeight.semibold },
  heading01: { fontSize: typeScale.step02, lineHeight: 1.42857, letterSpacing: 0.16, fontWeight: fontWeight.semibold },
  headingCompact02: { fontSize: typeScale.step03, lineHeight: 1.375, letterSpacing: 0, fontWeight: fontWeight.semibold },
  heading02: { fontSize: typeScale.step03, lineHeight: 1.5, letterSpacing: 0, fontWeight: fontWeight.semibold },
  heading03: { fontSize: typeScale.step05, lineHeight: 1.4, letterSpacing: 0, fontWeight: fontWeight.regular },
  heading04: { fontSize: typeScale.step07, lineHeight: 1.28572, letterSpacing: 0, fontWeight: fontWeight.regular },
  heading05: { fontSize: typeScale.step08, lineHeight: 1.25, letterSpacing: 0, fontWeight: fontWeight.regular },
} satisfies Record<string, TypeStyle>
