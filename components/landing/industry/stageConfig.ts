export const CFG = {
  HOLD_END: 0.05,
  EXPAND: [0.05, 0.32] as const,
  SPREAD_START: 0.12,
  SPREAD_END_TRAVEL: 0.55,      // when the row needs sideways travel
  SPREAD_END_FIT: 0.70,         // when the whole row fits
  TRAVEL: [0.55, 0.92] as const,
  SCROLL_VH_TRAVEL: 360,
  SCROLL_VH_FIT: 220,
  PANEL_START_MAX_W: 880,
  PANEL_START_MAX_H: 640,
  PANEL_START_H_VH: 0.74,
  PANEL_START_RADIUS: 48,
  PANEL_END_RADIUS: 36,
  PANEL_END_INSET: 24,
  ROW_PAD: 48,
  GAP: 24,
  PILE_VISIBLE: 3,
  PILE_DY: 10,
  PILE_ROT: 2.2,
  PILE_SCALE: 0.04,
  ROW_TILT: 2,
  FOCUS_SCALE: 1.04,
  FOCUS_RANGE: 0.6, // x card width
  FLIGHT_ARC: 24,
  SPREAD_STAGGER: 0.035,
} as const;

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
