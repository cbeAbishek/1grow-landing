export const N = 6;
export const T_VH = 100; // scroll distance per card transition, in vh (§10.2)
export const DWELL_VH = 40; // extra dwell after the last card (§10.2)
export const STRIP_H_PX = 46; // target header strip height in px (§5, §6.1)
export const PEEK1_DEFAULT = 46;
export const PEEK2_DEFAULT = 34;
export const ENTER_EXTRA = 120;
export const SCALE_STEP = 0.0487; // scale step per depth (1 - 0.0487 * d) (§5, §6.2)
export const DIM_STEP = 0.04; // 0.04 * d opaque navy dim overlay (§6.2)
export const ENTER_DIST = 1200; // px distance entering card starts below (§6.2)
export const NAV_BREAKPOINT = 1280; // left rail only when >= 1280px (gap rule)

// Critically damped spring for buttery smooth scrubbing (damping ratio >= 1: zero overshoot) (§10.1)
export const STACK_SPRING = {
  stiffness: 140,
  damping: 22,
  mass: 0.5,
  restDelta: 0.0004,
};

// Dark base colors for 100% opaque card backgrounds (§9)
export const CARD_BASE_COLORS: Record<string, string> = {
  training: '#4c1d95',
  rental: '#014486',
  event: '#9f1d1d',
  billing: '#14532d',
  inventory: '#9a3412',
  analytics: '#0b4f4a',
};

// Wordmark bottom tint colors (§7.3)
export const WORDMARK_TINTS: Record<string, string> = {
  training: '#e3d4ff',
  rental: '#bfe0ff',
  event: '#ffd0d0',
  billing: '#c8f5da',
  inventory: '#ffe0b8',
  analytics: '#c4f3ee',
};
