"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Quote,
  TrendingUp,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
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
                Plans built for how you{" "}
                <span className="text-gradient">actually run</span> your business
              </>
            }
            description="No confusing module checklists or per-feature paywalls. Hear directly from founders at your stage, choose the outcome you need, and scale without friction."
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
                  Test-drive your workflows with real data, invite your team, and experience the exact operational turnaround before paying a rupee.
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
        <div className="mt-10 flex flex-col items-center justify-center gap-3">
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

        {/* Persona Pricing Cards Grid */}
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

        {/* Enterprise Callout Banner */}
        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-border bg-surface-alt/70 p-6 text-center sm:flex-row sm:text-left sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h4 className="font-heading text-lg font-bold">
                  Franchise Academy or Custom ERP Integration?
                </h4>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  We support custom white-label deployments, dedicated account managers, tailored accounting sync, and strict SLAs for enterprises.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
            >
              Contact Enterprise Team
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PersonaCard({
  plan,
  billing,
  index,
}: {
  plan: PricingPersona;
  billing: BillingPeriod;
  index: number;
}) {
  const effectivePrice = calculateEffectiveMonthlyPrice(
    plan.monthlyPrice,
    billing
  );
  const hasDiscount = billing !== "monthly";

  return (
    <Reveal
      delay={index * 0.1}
      className={cn(
        "relative flex h-full flex-col rounded-3xl border transition-all duration-300",
        plan.highlight
          ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card shadow-2xl shadow-primary/15 ring-2 ring-primary/20 lg:-translate-y-2 lg:scale-[1.02] z-10"
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
        {/* Tier Header & Pricing */}
        <div className="border-b border-border/60 pb-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-heading text-xl font-bold tracking-tight">
                {plan.planName}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                {plan.tierSubtitle}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                plan.highlight
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {plan.businessStage}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              ₹{effectivePrice.toLocaleString("en-IN")}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-muted-foreground">
                /month
              </span>
              {hasDiscount && (
                <span className="text-[11px] text-muted-foreground line-through">
                  ₹{plan.monthlyPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
            {hasDiscount && (
              <span className="ml-auto rounded-md bg-accent-green/15 px-2 py-0.5 text-[11px] font-bold text-accent-green">
                Save {billing === "annual" ? "20%" : "10%"}
              </span>
            )}
          </div>
        </div>

        {/* Persona Identity & Character Card */}
        <div className="mt-6">
          <div className="flex items-center gap-3.5">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-alt shadow-sm">
              <Image
                src={plan.avatarImage}
                alt={plan.avatarAlt}
                width={80}
                height={80}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">
                  {plan.personaName}
                </span>
                <span className="inline-block size-1.5 rounded-full bg-accent-green" />
              </div>
              <p className="truncate text-xs text-muted-foreground font-medium">
                {plan.personaRole}
              </p>
            </div>
          </div>

          {/* Persona Speech Bubble (First-Person Voice) */}
          <div className="relative mt-3.5">
            {/* Bubble Tail */}
            <div className="absolute -top-2 left-6 size-0 border-x-8 border-x-transparent border-b-8 border-b-muted/80 dark:border-b-muted" />
            <div className="rounded-2xl border border-border/80 bg-muted/50 p-4 backdrop-blur-xs dark:bg-muted/30">
              <div className="flex items-start gap-2">
                <Quote className="mt-0.5 size-4 shrink-0 text-primary/70" />
                <p className="text-xs italic leading-relaxed text-foreground/90 sm:text-[13px]">
                  &ldquo;{plan.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* "For You If" Line */}
        <div className="mt-6 rounded-xl border border-border/60 bg-surface-alt/60 p-3.5">
          <div className="flex items-start gap-2">
            <UserCheck className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-foreground/90">
              <strong className="font-semibold text-foreground">For you if: </strong>
              {plan.forYouIf}
            </p>
          </div>
        </div>

        {/* Target Outcome Callout */}
        <div className="mt-3 rounded-xl border border-accent-green/20 bg-accent-green/5 p-3.5">
          <div className="flex items-start gap-2">
            <TrendingUp className="mt-0.5 size-4 shrink-0 text-accent-green" />
            <p className="text-xs font-medium leading-relaxed text-foreground">
              <strong className="font-semibold text-accent-green">Target Outcome: </strong>
              {plan.outcome}
            </p>
          </div>
        </div>

        {/* 3-4 Benefit-Based Differences (NO Modules Listed) */}
        <div className="mt-6 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            What transforms for your business:
          </p>
          <ul className="mt-3 space-y-2.5">
            {plan.benefitDifferences.map((benefit, bIndex) => (
              <li
                key={bIndex}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/85 sm:text-[13px]"
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full text-white shadow-xs",
                    plan.highlight ? "bg-primary text-primary-foreground" : "bg-accent-green"
                  )}
                >
                  <Check className="size-2.5 stroke-[3]" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-8 pt-4">
          <Link
            href={plan.ctaHref}
            className={cn(
              "group flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              plan.highlight
                ? "bg-gradient-to-r from-primary via-accent-yellow to-primary bg-size-200 text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                : "border-2 border-border bg-card text-foreground hover:border-primary hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {plan.ctaText}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Includes 20-day unrestricted trial · Cancel anytime
          </p>
        </div>
      </div>
    </Reveal>
  );
}
