export type ThreadMode = 'scroll' | 'auto'

export const THREAD_MODE: ThreadMode = 'scroll'

export const TL = {
  act: [0.04, 0.28, 0.52, 0.76, 0.96],
  segIn: 0.03,
  segOut: 0.02,
  actRamp: 0.06,
} as const

export const ease = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t) // easeInOutSine

export const segRange = (i: number) =>
  [TL.act[i] + TL.segIn, TL.act[i + 1] - TL.segOut] as const

export const segP = (p: number, i: number) => {
  const [a, b] = segRange(i)
  if (p <= a) return 0
  if (p >= b) return 1
  return ease((p - a) / (b - a))
}

export type Dir = 'up' | 'down' | 'left' | 'right'

export interface CardPlacement {
  leftPercent: number
  topH: number
  rotateZ: number
  rotateY: number
}

export const DESKTOP_PLACEMENTS: CardPlacement[] = [
  { leftPercent: 2.0, topH: 0.07, rotateZ: -5, rotateY: 5 },
  { leftPercent: 20.7, topH: 1.29, rotateZ: -6, rotateY: 5 },
  { leftPercent: 42.0, topH: 0.32, rotateZ: -7, rotateY: 3 },
  { leftPercent: 59.0, topH: 1.34, rotateZ: 7, rotateY: -5 },
  { leftPercent: 79.3, topH: 0.21, rotateZ: 6, rotateY: -5 },
]

export interface CardColourway {
  cardGrad: [string, string]
  darkCardGrad: [string, string]
  tileGrad: [string, string]
  darkTileGrad: [string, string]
  iconColor: string
  darkIconColor: string
  badgeBg: string
  darkBadgeBg: string
  toneRgb: string
  burstColor: string
}

export const STEP_COLOURWAYS: CardColourway[] = [
  // 1: warm orange/peach
  {
    cardGrad: ['#fff4ea', '#ffe9d6'],
    darkCardGrad: ['rgba(255,122,0,0.12)', 'rgba(255,122,0,0.04)'],
    tileGrad: ['#ffe2c7', '#ffd0a6'],
    darkTileGrad: ['rgba(255,122,0,0.25)', 'rgba(255,122,0,0.15)'],
    iconColor: '#f97316',
    darkIconColor: '#fb923c',
    badgeBg: '#ff7a00',
    darkBadgeBg: '#ff7a00',
    toneRgb: '255,122,0',
    burstColor: '#ff7a00',
  },
  // 2: lilac/purple
  {
    cardGrad: ['#f6efff', '#ede1ff'],
    darkCardGrad: ['rgba(147,51,234,0.12)', 'rgba(147,51,234,0.04)'],
    tileGrad: ['#e6d6ff', '#d9c2ff'],
    darkTileGrad: ['rgba(147,51,234,0.25)', 'rgba(147,51,234,0.15)'],
    iconColor: '#9333ea',
    darkIconColor: '#c084fc',
    badgeBg: '#a24fd0',
    darkBadgeBg: '#a24fd0',
    toneRgb: '147,51,234',
    burstColor: '#a24fd0',
  },
  // 3: pale blue/indigo
  {
    cardGrad: ['#eef2ff', '#e3eaff'],
    darkCardGrad: ['rgba(79,109,240,0.12)', 'rgba(79,109,240,0.04)'],
    tileGrad: ['#dfe6ff', '#cdd8ff'],
    darkTileGrad: ['rgba(79,109,240,0.25)', 'rgba(79,109,240,0.15)'],
    iconColor: '#4f6df0',
    darkIconColor: '#818cf8',
    badgeBg: '#5b7cf0',
    darkBadgeBg: '#5b7cf0',
    toneRgb: '79,109,240',
    burstColor: '#5b7cf0',
  },
  // 4: amber/cream
  {
    cardGrad: ['#fff6ea', '#ffe8d0'],
    darkCardGrad: ['rgba(245,158,11,0.12)', 'rgba(245,158,11,0.04)'],
    tileGrad: ['#ffe0c2', '#ffcf9e'],
    darkTileGrad: ['rgba(245,158,11,0.25)', 'rgba(245,158,11,0.15)'],
    iconColor: '#f97316',
    darkIconColor: '#fbbf24',
    badgeBg: '#f59e0b',
    darkBadgeBg: '#f59e0b',
    toneRgb: '245,158,11',
    burstColor: '#f59e0b',
  },
  // 5: mint/green
  {
    cardGrad: ['#eafaf1', '#d9f5e5'],
    darkCardGrad: ['rgba(34,197,94,0.12)', 'rgba(34,197,94,0.04)'],
    tileGrad: ['#cdf1de', '#b6e9cd'],
    darkTileGrad: ['rgba(34,197,94,0.25)', 'rgba(34,197,94,0.15)'],
    iconColor: '#16a34a',
    darkIconColor: '#4ade80',
    badgeBg: '#22c55e',
    darkBadgeBg: '#22c55e',
    toneRgb: '34,197,94',
    burstColor: '#16a34a',
  },
]

export interface CardAnchorDef {
  inNode?: {
    edge: 'left' | 'top' | 'right' | 'bottom'
    offsetOutside: number
    posRatio: number // along width or height
    dir: Dir
  }
  outNode?: {
    edge: 'left' | 'top' | 'right' | 'bottom'
    offsetOutside: number
    posRatio: number
    dir: Dir
  }
}

// Section 8.2 exact anchor specification
export const DESKTOP_ANCHOR_DEFS: CardAnchorDef[] = [
  // Card 1: out right (14px outside, y = 0.53 H, exit right)
  {
    outNode: { edge: 'right', offsetOutside: 14, posRatio: 0.53, dir: 'right' },
  },
  // Card 2: in left (12px outside, y = 0.54 H, enters right), out top (6px outside, x = 0.68 W, exits up)
  {
    inNode: { edge: 'left', offsetOutside: 12, posRatio: 0.54, dir: 'right' },
    outNode: { edge: 'top', offsetOutside: 6, posRatio: 0.68, dir: 'up' },
  },
  // Card 3: in left (20px outside, y = 0.55 H, enters right), out bottom (18px outside, x = 0.57 W, exits down)
  {
    inNode: { edge: 'left', offsetOutside: 20, posRatio: 0.55, dir: 'right' },
    outNode: { edge: 'bottom', offsetOutside: 18, posRatio: 0.57, dir: 'down' },
  },
  // Card 4: in left (6px outside, y = 0.50 H, enters right), out top (6px outside, x = 0.63 W, exits up)
  {
    inNode: { edge: 'left', offsetOutside: 6, posRatio: 0.5, dir: 'right' },
    outNode: { edge: 'top', offsetOutside: 6, posRatio: 0.63, dir: 'up' },
  },
  // Card 5: in left (18px outside, y = 0.53 H, enters right)
  {
    inNode: { edge: 'left', offsetOutside: 18, posRatio: 0.53, dir: 'right' },
  },
]

export interface Point {
  x: number
  y: number
}

const V: Record<Dir, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

const clampNum = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export function segmentPath(
  outPt: Point,
  outDir: Dir,
  inPt: Point,
  inDir: Dir = 'right',
): string {
  const d = Math.hypot(inPt.x - outPt.x, inPt.y - outPt.y)
  const L = clampNum(0.38 * d, 70, 150)
  const [vx, vy] = V[outDir]
  const c1: [number, number] = [outPt.x + vx * L, outPt.y + vy * L]
  // Enter heading right (or custom inDir vector)
  const [ivx, ivy] = inDir === 'right' ? [-1, 0] : [0, -1]
  const c2: [number, number] = [inPt.x + ivx * L, inPt.y + ivy * L]

  return `M${outPt.x.toFixed(2)},${outPt.y.toFixed(2)} C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${inPt.x.toFixed(2)},${inPt.y.toFixed(2)}`
}
