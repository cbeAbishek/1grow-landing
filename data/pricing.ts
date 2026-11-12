export type BillingPeriod = "monthly" | "half" | "annual";

export interface BillingOption {
  id: BillingPeriod;
  label: string;
  badge?: string;
  discountRate: number; // e.g. 0.2 for 20% discount
  savingsLabel?: string;
}

export interface PricingPersona {
  id: string;
  planName: string;
  tierSubtitle: string;
  personaName: string;
  personaRole: string;
  businessStage: string;
  avatarImage: string;
  avatarAlt: string;
  quote: string; // 1st person speech bubble quote
  forYouIf: string;
  outcome: string;
  benefitDifferences: string[]; // 3-4 benefit-based differences (NO modules listed)
  monthlyPrice: number;
  highlight: boolean;
  popularBadge?: string;
  ctaText: string;
  ctaHref: string;
  accentColor: "primary" | "blue" | "green";
}

export const billingOptions: BillingOption[] = [
  {
    id: "monthly",
    label: "Monthly",
    discountRate: 0,
  },
  {
    id: "half",
    label: "6 Months",
    badge: "Save 10%",
    discountRate: 0.1,
    savingsLabel: "10% Off",
  },
  {
    id: "annual",
    label: "12 Months",
    badge: "Save 20%",
    discountRate: 0.2,
    savingsLabel: "2 Months Free",
  },
];

export const personaPlans: PricingPersona[] = [
  {
    id: "solo",
    planName: "Solo Plan",
    tierSubtitle: "For Independent Operators & Single Locations",
    personaName: "Karthik Sundaram",
    personaRole: "Founder & Head Coach, Pulse Martial Arts",
    businessStage: "Solo Owner · 1 Location",
    avatarImage: "/assert/solo.png",
    avatarAlt: "Karthik Sundaram - Solo Academy Owner",
    quote:
      "Before 1Grow, I spent two hours every evening reconciling UPI screenshots, updating registers, and awkwardly texting parents for fee dues. With this plan, reminders go out automatically, attendance takes two taps on my phone, and I finally have my evenings back.",
    forYouIf:
      "You run your coaching academy, rental counter, or studio solo and need to end manual spreadsheet chaos.",
    outcome:
      "Reclaim 15+ admin hours every week and recover 100% of overlooked fee payments.",
    benefitDifferences: [
      "Zero awkward fee chasing with automated WhatsApp payment reminders and direct UPI collection links.",
      "One-tap mobile attendance and check-in that keeps parent communication instant and transparent.",
      "Live calendar availability to eliminate double-booking mistakes permanently.",
      "Instant daily revenue snapshot on mobile so you always know your exact cash flow and pending dues.",
    ],
    monthlyPrice: 999,
    highlight: false,
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
    accentColor: "blue",
  },
  {
    id: "business",
    planName: "Business Plan",
    tierSubtitle: "For Expanding Teams & Multi-Branch Hubs",
    personaName: "Ananya Krishnan",
    personaRole: "Managing Director, Spark Studios & Stage Rentals",
    businessStage: "Growing Team · Up to 3 Branches",
    avatarImage: "/assert/business.png",
    avatarAlt: "Ananya Krishnan - Multi-Branch Business Director",
    quote:
      "When we grew to three locations, staff miscommunication and double-booked inventory almost broke us. This plan gave my branch managers delegated autonomy with strict role permissions, while giving me live oversight across all locations without micromanaging.",
    forYouIf:
      "You manage multiple branches or a growing staff team and need delegated control with unified executive visibility.",
    outcome:
      "Synchronize multi-location operations seamlessly and eliminate scheduling clashes across teams.",
    benefitDifferences: [
      "Multi-branch centralized dashboard with custom role permissions so managers only access their own floor.",
      "Cross-location resource scheduling to guarantee equipment, staff, and slots are never double-committed.",
      "Automated WhatsApp workflows for instant booking confirmations, dispatches, and client status updates.",
      "Dedicated 24/7 self-service client portal for transparent schedules, invoices, and booking histories.",
    ],
    monthlyPrice: 1899,
    highlight: true,
    popularBadge: "Most Popular · Founder's Choice",
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
    accentColor: "primary",
  },
  {
    id: "complete",
    planName: "Scale Plan",
    tierSubtitle: "For Multi-Service Companies & Large Operations",
    personaName: "Vikramaditya Sengupta",
    personaRole: "CEO, Apex Academy & Grand Events Group",
    businessStage: "Enterprise Scale · Up to 10 Branches",
    avatarImage: "/assert/complete.png",
    avatarAlt: "Vikramaditya Sengupta - Multi-Service Enterprise CEO",
    quote:
      "We operate multi-city academies, corporate event teams, and extensive rental fleets. We couldn't afford disconnected tools or restrictive record caps. This plan powers our entire business with predictive revenue forecasting and automated follow-ups that win high-ticket clients before competitors reply.",
    forYouIf:
      "You run an established multi-service business or multi-city network requiring AI intelligence and unlimited record capacity.",
    outcome:
      "Achieve total operational independence with predictive AI revenue analytics and VIP support.",
    benefitDifferences: [
      "Predictive AI revenue forecasting and smart follow-up automation that converts high-intent enquiries faster.",
      "Unlimited operational capacity with no restrictions on records, client accounts, or booking volume.",
      "Full multi-portal ecosystem (students, rental clients, vendor partners) under your unified brand.",
      "Dedicated VIP onboarding specialist and prioritized support response to guarantee zero operational downtime.",
    ],
    monthlyPrice: 2499,
    highlight: false,
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
    accentColor: "green",
  },
];

export function calculateEffectiveMonthlyPrice(
  baseMonthlyPrice: number,
  billingPeriod: BillingPeriod
): number {
  const option = billingOptions.find((opt) => opt.id === billingPeriod);
  if (!option || option.discountRate === 0) return baseMonthlyPrice;
  return Math.round(baseMonthlyPrice * (1 - option.discountRate));
}

export function calculateAnnualTotal(baseMonthlyPrice: number): number {
  return Math.round(baseMonthlyPrice * 12 * 0.8);
}
