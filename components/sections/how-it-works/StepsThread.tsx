'use client'

import React, { useRef, useState, useEffect, useId } from 'react'
import {
  motion,
  MotionValue,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import {
  TL,
  segRange,
  segP,
  segmentPath,
  Point,
  Dir,
  DESKTOP_ANCHOR_DEFS,
} from './stepsConfig'

interface NodePoint {
  id: string
  x: number
  y: number
  triggerP: number
}

interface PathDef {
  d: string
  outNode: NodePoint
  inNode: NodePoint
}

interface StepsThreadProps {
  stageRef: React.RefObject<HTMLOListElement | null>
  progress: MotionValue<number>
  isDesktop: boolean
}

function RevealStroke({
  d,
  progress,
  index,
  isReducedMotion,
}: {
  d: string
  progress: MotionValue<number>
  index: number
  isReducedMotion: boolean
}) {
  const offset = useTransform(progress, (p: number) =>
    isReducedMotion ? 0 : 1 - segP(p, index),
  )

  return (
    <motion.path
      d={d}
      pathLength={1}
      fill="none"
      stroke="#ffffff"
      strokeWidth={16}
      strokeLinecap="round"
      style={{
        strokeDasharray: 1,
        strokeDashoffset: offset,
      }}
    />
  )
}

function NodeItem({
  node,
  progress,
  isReducedMotion,
}: {
  node: NodePoint
  progress: MotionValue<number>
  isReducedMotion: boolean
}) {
  const [lit, setLit] = useState(isReducedMotion)

  useEffect(() => {
    if (isReducedMotion) {
      setLit(true)
      return
    }
    return progress.on('change', (p) => {
      setLit(p >= node.triggerP)
    })
  }, [progress, node.triggerP, isReducedMotion])

  return (
    <g transform={`translate(${node.x.toFixed(2)}, ${node.y.toFixed(2)})`}>
      {/* Halo */}
      <circle
        r={11}
        fill="rgba(139, 92, 246, 0.18)"
        className={lit ? 'steps-node-halo-lit' : ''}
      />
      {/* Core Dot */}
      <circle
        r={6}
        fill={lit ? '#8b5cf6' : '#c4b5fd'}
        className="transition-colors duration-300"
      />
      {/* Inner Pinpoint */}
      {lit && <circle r={2.5} fill="#ffffff" />}
    </g>
  )
}

function Traveller({
  progress,
  pathRefs,
  isReducedMotion,
}: {
  progress: MotionValue<number>
  pathRefs: (SVGPathElement | null)[]
  isReducedMotion: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useMotionValue(0)

  useMotionValueEvent(progress, 'change', (p) => {
    if (isReducedMotion) {
      opacity.set(0)
      return
    }

    const activeSegIndex = [0, 1, 2, 3].find((i) => {
      const [a, b] = segRange(i)
      return p >= a && p <= b
    })

    if (activeSegIndex === undefined) {
      // If we are before segment 0 starts, hide
      if (p < segRange(0)[0]) {
        opacity.set(0)
        return
      }
      // If we are past all segments, park on end of segment 3
      if (p > segRange(3)[1]) {
        const lastPath = pathRefs[3]
        if (lastPath) {
          try {
            const endPt = lastPath.getPointAtLength(lastPath.getTotalLength())
            x.set(endPt.x)
            y.set(endPt.y)
            opacity.set(Math.max(0, 1 - (p - 0.96) * 15))
          } catch {
            opacity.set(0)
          }
        }
        return
      }
      opacity.set(0)
      return
    }

    const path = pathRefs[activeSegIndex]
    if (!path) {
      opacity.set(0)
      return
    }

    try {
      const totalLen = path.getTotalLength()
      const localP = segP(p, activeSegIndex)
      const pt = path.getPointAtLength(localP * totalLen)
      x.set(pt.x)
      y.set(pt.y)

      // Fade in at head start, fade out at segment end
      const edgeFade = Math.min(1, Math.min(localP * 8, (1 - localP) * 8))
      opacity.set(edgeFade)
    } catch {
      opacity.set(0)
    }
  })

  if (isReducedMotion) return null

  return (
    <motion.g style={{ x, y, opacity }}>
      {/* Glow Halo */}
      <circle r={14} fill="url(#traveller-glow)" />
      {/* White Core */}
      <circle r={6} fill="#ffffff" />
    </motion.g>
  )
}

export function StepsThread({
  stageRef,
  progress,
  isDesktop,
}: StepsThreadProps) {
  const shouldReduceMotion = useReducedMotion()
  const [dimensions, setDimensions] = useState({ width: 1200, height: 960 })
  const [paths, setPaths] = useState<PathDef[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const maskId = `steps-reveal-${useId().replace(/[^a-zA-Z0-9-_]/g, '')}`

  // Measure card layout boxes relative to stage and build Bézier curves (§8.1, §8.2, §8.3)
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const computeGeometry = () => {
      const stageRect = stage.getBoundingClientRect()
      const stageW = stage.offsetWidth || stageRect.width || 1200
      const stageH = stage.offsetHeight || stageRect.height || 960
      setDimensions({ width: stageW, height: stageH })

      const cardEls = Array.from(stage.querySelectorAll<HTMLElement>('[data-step-card]'))
      if (cardEls.length < 5) return

      const cardBoxes = cardEls.map((el) => {
        return {
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        }
      })

      const newPaths: PathDef[] = []

      if (isDesktop) {
        // Desktop zig-zag geometry (§8.2, §8.3)
        for (let i = 0; i < 4; i++) {
          const fromBox = cardBoxes[i]
          const toBox = cardBoxes[i + 1]
          const fromAnchorDef = DESKTOP_ANCHOR_DEFS[i].outNode!
          const toAnchorDef = DESKTOP_ANCHOR_DEFS[i + 1].inNode!

          // Compute exact Out Anchor
          let outPt: Point
          if (fromAnchorDef.edge === 'right') {
            outPt = {
              x: fromBox.left + fromBox.width + fromAnchorDef.offsetOutside,
              y: fromBox.top + fromBox.height * fromAnchorDef.posRatio,
            }
          } else if (fromAnchorDef.edge === 'bottom') {
            outPt = {
              x: fromBox.left + fromBox.width * fromAnchorDef.posRatio,
              y: fromBox.top + fromBox.height + fromAnchorDef.offsetOutside,
            }
          } else {
            // top
            outPt = {
              x: fromBox.left + fromBox.width * fromAnchorDef.posRatio,
              y: fromBox.top - fromAnchorDef.offsetOutside,
            }
          }

          // Compute exact In Anchor
          const inPt: Point = {
            x: toBox.left - toAnchorDef.offsetOutside,
            y: toBox.top + toBox.height * toAnchorDef.posRatio,
          }

          const d = segmentPath(outPt, fromAnchorDef.dir, inPt, toAnchorDef.dir)

          const [segStart, segEnd] = segRange(i)
          newPaths.push({
            d,
            outNode: {
              id: `node-${i}-out`,
              x: outPt.x,
              y: outPt.y,
              triggerP: segStart,
            },
            inNode: {
              id: `node-${i + 1}-in`,
              x: inPt.x,
              y: inPt.y,
              triggerP: segEnd,
            },
          })
        }
      } else {
        // Tablet / Mobile Vertical Timeline Geometry (§10)
        // From card i bottom-center down to card i+1 top-center, swinging in gutter
        for (let i = 0; i < 4; i++) {
          const fromBox = cardBoxes[i]
          const toBox = cardBoxes[i + 1]

          const outPt: Point = {
            x: fromBox.left + fromBox.width * 0.5,
            y: fromBox.top + fromBox.height + 14,
          }
          const inPt: Point = {
            x: toBox.left + toBox.width * 0.5,
            y: toBox.top - 14,
          }

          const midY = (outPt.y + inPt.y) * 0.5
          const swingX = i % 2 === 0 ? Math.max(20, outPt.x - 45) : Math.min(stageW - 20, outPt.x + 45)

          const d = `M${outPt.x.toFixed(2)},${outPt.y.toFixed(2)} C${outPt.x.toFixed(2)},${midY.toFixed(2)} ${swingX.toFixed(2)},${midY.toFixed(2)} ${inPt.x.toFixed(2)},${inPt.y.toFixed(2)}`

          const [segStart, segEnd] = segRange(i)
          newPaths.push({
            d,
            outNode: {
              id: `node-${i}-out`,
              x: outPt.x,
              y: outPt.y,
              triggerP: segStart,
            },
            inNode: {
              id: `node-${i + 1}-in`,
              x: inPt.x,
              y: inPt.y,
              triggerP: segEnd,
            },
          })
        }
      }

      setPaths(newPaths)
    }

    computeGeometry()

    const ro = new ResizeObserver(() => {
      computeGeometry()
    })
    ro.observe(stage)
    window.addEventListener('resize', computeGeometry)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', computeGeometry)
    }
  }, [stageRef, isDesktop])

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      className="steps-thread absolute inset-0 w-full h-full overflow-visible pointer-events-none select-none z-0"
    >
      <defs>
        {/* Progressive reveal mask (§8.4) */}
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
        >
          {paths.map((p, i) => (
            <RevealStroke
              key={i}
              d={p.d}
              progress={progress}
              index={i}
              isReducedMotion={!!shouldReduceMotion}
            />
          ))}
        </mask>

        {/* Radial glow for Traveller orb */}
        <radialGradient id="traveller-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1: Ghost Thread (dashed #d8cdf8, always visible) */}
      <g className="ghost-thread">
        {paths.map((p, i) => (
          <path
            key={`ghost-${i}`}
            d={p.d}
            fill="none"
            stroke="#d8cdf8"
            className="dark:stroke-[#a78bfa]/30"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
        ))}
      </g>

      {/* Layer 2: Active Thread with progressive mask */}
      <g mask={`url(#${maskId})`}>
        {/* Soft wide stroke for glow (no CSS filter/blur) */}
        {paths.map((p, i) => (
          <path
            key={`glow-${i}`}
            d={p.d}
            fill="none"
            stroke="#8b5cf6"
            className="dark:stroke-[#a78bfa]"
            strokeWidth={9}
            strokeOpacity={0.2}
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
        ))}

        {/* Active sharp dashed stroke */}
        {paths.map((p, i) => (
          <path
            key={`active-${i}`}
            ref={(el) => {
              pathRefs.current[i] = el
            }}
            d={p.d}
            fill="none"
            stroke="#8b5cf6"
            className="dark:stroke-[#a78bfa]"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
        ))}
      </g>

      {/* Layer 3: Glowing Nodes (out-nodes and in-nodes) */}
      <g className="thread-nodes">
        {paths.map((p, i) => (
          <React.Fragment key={`nodes-${i}`}>
            <NodeItem
              node={p.outNode}
              progress={progress}
              isReducedMotion={!!shouldReduceMotion}
            />
            <NodeItem
              node={p.inNode}
              progress={progress}
              isReducedMotion={!!shouldReduceMotion}
            />
          </React.Fragment>
        ))}
      </g>

      {/* Layer 4: Animated Traveller Orb */}
      <Traveller
        progress={progress}
        pathRefs={pathRefs.current}
        isReducedMotion={!!shouldReduceMotion}
      />
    </svg>
  )
}
