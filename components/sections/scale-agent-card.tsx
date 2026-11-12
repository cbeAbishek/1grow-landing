"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Crown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import type { PricingPersona } from "@/data/pricing";

interface ScaleAgentCardProps {
  plan: PricingPersona;
  index?: number;
}

export function ScaleAgentCard({ plan, index = 2 }: ScaleAgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Remount the GIF so the arm-crossing animation restarts from its first frame.
    setAnimKey((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Reveal delay={index * 0.1} className="flex min-w-0 flex-1">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "group/scalecard relative flex min-w-0 flex-1 flex-col rounded-[28px] border bg-card transition-all duration-300",
          isHovered
            ? "border-primary/50 shadow-2xl shadow-primary/10 ring-1 ring-primary/30"
            : "border-border shadow-lg shadow-black/[0.04]"
        )}
      >
        {/*
          Third card presenter:
          Large businessman standing in the bottom-right corner.
          In idle: standing attentively.
          On hover: smoothly crosses his arms in a confident executive pose.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-auto absolute -bottom-1 -right-3 z-20 select-none sm:-bottom-2 sm:-right-5 lg:-bottom-1 lg:-right-6 xl:-right-8"
          style={{
            height: "clamp(260px, 44vh, 380px)",
            aspectRatio: "134 / 349",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-full w-full">
            {/* Ground contact shadow under shoes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-1/2 h-3.5 w-24 -translate-x-1/2 rounded-full bg-black/25 blur-md dark:bg-black/40"
            />

            {/* Ambient spotlight behind the executive presenter */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -inset-8 -z-10 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-30"
              )}
            />

            {/* Motion wrapper with interactive hover lift */}
            <motion.div
              animate={{
                scale: isHovered ? 1.03 : 1,
                y: isHovered ? -3 : 0,
              }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="relative h-full w-full"
            >
              {/* Idle pose */}
              <img
                src="/assert/businessman-crossing-arms-still.png"
                alt="Vikramaditya Sengupta - Scale Plan Executive"
                draggable={false}
                className={cn(
                  "pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-2xl transition-opacity duration-300 ease-out",
                  isHovered ? "opacity-0" : "opacity-100"
                )}
              />

              {/* Crossing arms animation GIF */}
              <img
                key={animKey}
                src="/assert/businessman-crossing-arms.gif"
                alt=""
                aria-hidden="true"
                draggable={false}
                className={cn(
                  "pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-2xl transition-opacity duration-300 ease-out",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col items-start pt-1 sm:pt-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80">
                <span className="size-1.5 rounded-full bg-primary" />
                Grow
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[11px] font-medium transition-all duration-300",
                  isHovered
                    ? "translate-x-0 text-primary opacity-100"
                    : "text-muted-foreground opacity-75"
                )}
              >
                <Crown className="size-3 text-primary" aria-hidden="true" />
                Enterprise
              </span>
            </div>

            <h3 className="mt-2.5 font-heading text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
              {plan.planName}
            </h3>
            <p className="mt-1 text-xs font-medium leading-snug text-muted-foreground">
              {plan.characterName}
              <span className="block font-normal text-muted-foreground/85">
                {plan.characterRole}
              </span>
            </p>
          </div>

          {/* Features list */}
          <div className="mt-4 flex-1">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground/80">
                What you get
              </p>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-300",
                  isHovered
                    ? "font-semibold text-primary"
                    : "text-muted-foreground/70"
                )}
              >
                All Modules Unlocked
              </span>
            </div>

            <ul className="space-y-1.5">
              {plan.features.map((feature) => {
                if (feature.startsWith("Everything in")) {
                  return (
                    <li
                      key={feature}
                      className="flex items-center gap-2 pb-0.5 pt-1.5 text-xs font-semibold text-muted-foreground"
                    >
                      <span className="h-px flex-1 bg-border" />
                      {feature}
                      <span className="h-px flex-1 bg-border" />
                    </li>
                  );
                }

                return (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-xs font-medium leading-snug text-foreground/85 transition-colors duration-200",
                      isHovered && "border-primary/20 bg-background/80"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-px grid size-4 shrink-0 place-items-center rounded-full bg-accent-green/15 text-accent-green transition-transform duration-200",
                        isHovered && "scale-110 bg-accent-green/25"
                      )}
                    >
                      <Check
                        className="size-2.5"
                        strokeWidth={3.5}
                        aria-hidden="true"
                      />
                    </span>
                    <span>{feature}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Price */}
          <div
            className={cn(
              "relative mt-5 flex flex-col items-start justify-center rounded-2xl border border-border/60 bg-background/30 p-4 transition-all duration-300",
              isHovered &&
                "border-primary/40 bg-primary/[0.04] shadow-sm shadow-primary/10"
            )}
          >
            <div className="flex items-baseline justify-start gap-1.5">
              <span
                className={cn(
                  "font-heading text-4xl font-extrabold tabular-nums tracking-tight text-foreground transition-all duration-300 sm:text-5xl",
                  isHovered && "scale-[1.03] text-primary"
                )}
              >
                ₹{plan.monthlyPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                /month
              </span>
            </div>
            <p
              className={cn(
                "mt-1 text-left text-[11px] transition-colors duration-300",
                isHovered
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              )}
            >
              Enterprise multi-service · Unlimited records
            </p>
          </div>

          {/* CTA: with right margin on wider screens so the corner businessman has space */}
          <div className="mt-5 relative z-30 pr-16 sm:pr-20 lg:pr-24">
            <Link
              href={plan.ctaHref}
              className={cn(
                "group/btn relative flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isHovered
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                  : "border-border bg-card text-foreground hover:border-primary hover:bg-muted/50"
              )}
            >
              <span>{plan.ctaText}</span>
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              20-day full access, no card required
            </p>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
