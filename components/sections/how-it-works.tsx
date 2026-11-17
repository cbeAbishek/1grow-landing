'use client'

import React, { useRef, useState, useEffect } from 'react'
import {
  useScroll,
  useMotionValue,
  animate,
  useInView,
} from 'framer-motion'
import { Container } from '@/components/layout/container'
import { ReferenceWave } from '@/components/layout/reference-wave'
import { steps } from '@/content/landing'
import { StepsBackgroundDecor } from './how-it-works/StepsBackgroundDecor'
import { StepsHeader } from './how-it-works/StepsHeader'
import { StepCard } from './how-it-works/StepCard'
import { StepsThread } from './how-it-works/StepsThread'
import { THREAD_MODE } from './how-it-works/stepsConfig'

export function HowItWorks() {
  const stageRef = useRef<HTMLOListElement>(null)
  const [isDesktop, setIsDesktop] = useState(true)

  // Media query listener for >= 1024px desktop vs tablet/mobile timeline
  useEffect(() => {
    const checkMq = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkMq()
    window.addEventListener('resize', checkMq)
    return () => window.removeEventListener('resize', checkMq)
  }, [])

  // Scroll-linked progress (§9.1)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: isDesktop ? ['start 78%', 'end 40%'] : ['start 80%', 'end 50%'],
  })

  // Auto-play progress option (§9.1)
  const autoProgress = useMotionValue(0)
  const isStageInView = useInView(stageRef, { once: true, amount: 0.35 })

  useEffect(() => {
    if (THREAD_MODE === 'auto' && isStageInView) {
      const controls = animate(autoProgress, 1, {
        duration: 10,
        ease: 'linear',
      })
      return controls.stop
    }
  }, [isStageInView, autoProgress])

  const progress = THREAD_MODE === 'auto' ? autoProgress : scrollYProgress

  return (
    <section
      id="how-it-works"
      data-band="light"
      aria-labelledby="how-it-works-heading"
      className="relative scroll-mt-24 pt-24 pb-52 sm:pt-28 sm:pb-60 lg:pb-72 overflow-x-clip transition-colors duration-300"
      style={{
        background:
          'var(--how-it-works-bg, linear-gradient(180deg, #f8f4ff 0%, #f3ecff 100%))',
      }}
    >
      {/* Background Decor: Corner organic shapes + 24px dot pattern (§7.1) */}
      <StepsBackgroundDecor />

      <Container className="relative z-10 max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header with Swoosh Underline (§7.2) */}
        <StepsHeader />

        {/* 5-Step Stage: Desktop Zig-Zag / Mobile Vertical Timeline (§6.1, §10) */}
        {isDesktop ? (
          <ol
            ref={stageRef}
            className="steps-stage relative w-full max-w-[1320px] mx-auto select-none"
            style={{
              height: 'calc(2.4 * var(--step-card-h, clamp(380px, 29vw, 420px)))',
            }}
          >
            {/* Animated Dashed Purple Thread with Glowing Nodes & Traveller (§8) */}
            <StepsThread
              stageRef={stageRef}
              progress={progress}
              isDesktop={true}
            />

            {/* 5 Tilted Glass-Pastel Cards in Zig-Zag rhythm (§6.1, §6.2) */}
            {steps.map((step, idx) => (
              <StepCard
                key={step.number}
                step={step}
                index={idx}
                progress={progress}
                isDesktop={true}
              />
            ))}
          </ol>
        ) : (
          <ol
            ref={stageRef}
            className="steps-stage relative flex flex-col gap-14 sm:gap-16 w-full max-w-[420px] mx-auto py-6 select-none"
          >
            {/* Vertical Thread Overlay for Tablet & Mobile (§10) */}
            <StepsThread
              stageRef={stageRef}
              progress={progress}
              isDesktop={false}
            />

            {/* 5 Cards in Alternating Vertical Alignment (§10) */}
            {steps.map((step, idx) => (
              <StepCard
                key={step.number}
                step={step}
                index={idx}
                progress={progress}
                isDesktop={false}
              />
            ))}
          </ol>
        )}
      </Container>

      {/* Reference 3-Layer Static Wave transitioning into Why Choose Us */}
      <ReferenceWave
        colors={[
          'var(--wave-howitworks-end-1)',
          'var(--wave-howitworks-end-2)',
          'var(--wave-howitworks-end-3)',
        ]}
      />
    </section>
  )
}
