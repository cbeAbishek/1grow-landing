"use client";

import { useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { PersonaAvatar } from "@/components/persona/persona-avatar";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import {
  billingOptions,
  personaPlans,
  calculateEffectiveMonthlyPrice,
  type BillingPeriod,
  type PricingPersona,
} from "@/data/pricing";

interface PricingProps {
  showHeading?: boolean;
  className?: string;
  id?: string;
}

export function Pricing({
  showHeading = true,
  className,
  id = "pricing",
}: PricingProps) {
  const [billing, setBilling] = useState<BillingPeriod>("annual");

  return (
    <section
      id={id}
      aria-labelledby="pricing-heading"
      className={cn("scroll-mt-24 px-4 py-20 sm:py-24", className)}
    >
      <div className="mx-auto max-w-7xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Persona-Based Pricing"
            title={
              <>
                Meet the founders{" "}
                <span className="text-gradient">scaling on 1Grow</span>
              </>
            }
            description="Real business owners sharing genuine business outcomes at your operational stage. No static module checklists—just results."
            accentColor="primary"
          />
        )}

        {/* 20-Day Free Trial Launch Banner */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-accent-green/25 bg-gradient-to-r from-accent-green/10 via-card to-accent-green/5 p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-green/20 text-accent-green shadow-sm">
                <Sparkles className="size-6" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-base font-bold text-foreground sm:text-lg">
                    Full Platform Access · 20-Day Free Trial
                  </p>
                  <span className="inline-flex items-center rounded-full bg-accent-green/20 px-2.5 py-0.5 text-xs font-semibold text-accent-green">
                    No Credit Card Required
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Experience the exact operational turnaround before paying a single rupee. All features unlocked.
                </p>
              </div>
            </div>
            <div className="mt-4 shrink-0 sm:mt-0 sm:pl-4">
              <Link
                href="/wishlist"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-green/20 transition-all hover:bg-accent-green/90 sm:w-auto"
              >
                Claim Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Billing frequency toggle */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Billing Periods */}
            <div
              role="tablist"
              aria-label="Billing frequency selection"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 p-1.5 shadow-inner backdrop-blur-sm"
            >
              {billingOptions.map((option) => {
                const isSelected = billing === option.id;
                return (
                  <button
                    key={option.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setBilling(option.id)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{option.label}</span>
                    {option.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-accent-green/15 text-accent-green"
                        )}
                      >
                        {option.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {billing === "annual" ? (
              <span className="font-medium text-accent-green">
                ✓ 20% Annual savings applied — enjoy 2 months free!
              </span>
            ) : billing === "half" ? (
              <span className="font-medium text-accent-green">
                ✓ 10% Semi-annual savings applied
              </span>
            ) : (
              "Standard monthly billing, cancel anytime with 1 click."
            )}
          </p>
        </div>

        {/* Minimal Persona Pricing Cards Grid (ONLY Character, Plan Name, Price, CTA) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {personaPlans.map((plan, i) => (
            <PersonaCard
              key={plan.id}
              plan={plan}
              billing={billing}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PersonaCardProps {
  plan: PricingPersona;
  billing: BillingPeriod;
  index: number;
}

function PersonaCard({
  plan,
  billing,
  index,
}: PersonaCardProps) {
  const reduceMotion = useReducedMotion();
  const effectivePrice = calculateEffectiveMonthlyPrice(
    plan.monthlyPrice,
    billing
  );
  const hasDiscount = billing !== "monthly";

  return (
    <Reveal
      delay={index * 0.1}
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border transition-all duration-300",
        plan.highlight
          ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card shadow-2xl shadow-primary/15 ring-2 ring-primary/25 lg:-translate-y-2 lg:scale-[1.03] z-10"
          : "border-border bg-card hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5"
      )}
    >
      {/* Popular Badge for Highlighted Middle Plan */}
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent-yellow px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30">
            <Sparkles className="size-3.5 fill-current" />
            {plan.popularBadge || "Most Popular"}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* 1. Plan Name & Persona Header */}
        <div className="text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {plan.planName}
          </h3>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {plan.characterName} · {plan.characterRole}
          </p>
        </div>

        {/* 2. The Persona — portrait with an eye-blink gesture */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          <PersonaAvatar
            planId={plan.id}
            reduceMotion={!!reduceMotion}
            className="relative z-10 h-44 w-auto drop-shadow-xl transition-all duration-300 group-hover:scale-[1.03] sm:h-48"
          />
        </div>

        {/* 3. What's included in this package */}
        <ul className="mt-2 flex-1 space-y-1.5 border-t border-border/60 pt-3">
          {plan.features.map((feature) => {
            const isDivider = feature.startsWith("Everything in");
            if (isDivider) {
              return (
                <li
                  key={feature}
                  className="pt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {feature}
                </li>
              );
            }
            return (
              <li
                key={feature}
                className="flex items-start gap-2 text-[11px] font-medium leading-snug text-foreground/90 sm:text-xs"
              >
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-green/15 text-accent-green">
                  <Check className="size-2.5" strokeWidth={3.5} aria-hidden="true" />
                </span>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>

        {/* 4. Price Display */}
        <div className="border-t border-border/60 pt-4 text-center">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              ₹{effectivePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              /month
            </span>
          </div>

          <div className="mt-1 flex items-center justify-center gap-2">
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{plan.monthlyPrice.toLocaleString("en-IN")}
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-md bg-accent-green/15 px-2 py-0.5 text-[11px] font-bold text-accent-green">
                Save {billing === "annual" ? "20%" : "10%"}
              </span>
            )}
            {!hasDiscount && (
              <span className="text-[11px] text-muted-foreground">
                Billed monthly
              </span>
            )}
          </div>
        </div>

        {/* 5. CTA Button */}
        <div className="mt-5">
          <Link
            href={plan.ctaHref}
            className={cn(
              "group/btn flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              plan.highlight
                ? "bg-gradient-to-r from-primary via-accent-yellow to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                : "border-2 border-border bg-card text-foreground hover:border-primary hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <span>{plan.ctaText}</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            20-day full access · No card required
          </p>
        </div>
      </div>
    </Reveal>
  );
}
