export type BillingPeriod = "monthly" | "half" | "annual";

export interface BillingOption {
  id: BillingPeriod;
  label: string;
  badge?: string;
  discountRate: number; // e.g. 0.2 for 20% discount
  savingsLabel?: string;
}

export interface VoiceConfig {
  rate: number;
  pitch: number;
  lang: string;
}

export interface PricingPersona {
  id: string;
  planName: string;
  characterName: string;
  characterRole: string;
  characterImage: string;
  characterAlt: string;
  speechScript: string; // Spoken first-person message
  audioFile?: string; // Optional audio file from public/audio/
  voiceConfig: VoiceConfig;
  monthlyPrice: number;
  highlight: boolean;
  popularBadge?: string;
  ctaText: string;
  ctaHref: string;
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
    characterName: "Karthik Sundaram",
    characterRole: "Solo Academy & Studio Owner",
    characterImage: "/assert/solo.png",
    characterAlt: "Karthik - Solo Academy Owner",
    speechScript:
      "Hey there! Before 1Grow, I was losing two hours every night chasing fee dues on WhatsApp and updating messy notebooks. With the Solo plan, payment reminders go out automatically, attendance takes two taps on my phone, and I finally got my evenings back. If you run your counter solo, this is made for you!",
    audioFile: "/audio/solo.mp3",
    voiceConfig: {
      rate: 0.98,
      pitch: 1.0,
      lang: "en-IN",
    },
    monthlyPrice: 999,
    highlight: false,
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
  },
  {
    id: "business",
    planName: "Business Plan",
    characterName: "Ananya Krishnan",
    characterRole: "Multi-Branch Managing Director",
    characterImage: "/assert/business.png",
    characterAlt: "Ananya - Multi-Branch Business Director",
    speechScript:
      "Hi! When we scaled to three locations, miscommunication and double-booked inventory almost broke our business. The Business plan gave my branch managers role-based autonomy while giving me a live bird's-eye view of every location's revenue and operations. It keeps our entire team synchronized without micromanagement.",
    audioFile: "/audio/business.mp3",
    voiceConfig: {
      rate: 0.96,
      pitch: 1.1,
      lang: "en-IN",
    },
    monthlyPrice: 1899,
    highlight: true,
    popularBadge: "Most Popular",
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
  },
  {
    id: "complete",
    planName: "Scale Plan",
    characterName: "Vikramaditya Sengupta",
    characterRole: "Multi-Service Enterprise CEO",
    characterImage: "/assert/complete.png",
    characterAlt: "Vikramaditya - Multi-Service Enterprise CEO",
    speechScript:
      "Hello! We operate multi-city academies, corporate event teams, and extensive rental fleets. We couldn't afford disconnected tools or artificial record limits. This plan runs our entire company end-to-end with predictive AI revenue forecasting and automated lead follow-ups that close high-ticket clients before competitors reply.",
    audioFile: "/audio/complete.mp3",
    voiceConfig: {
      rate: 0.95,
      pitch: 0.9,
      lang: "en-IN",
    },
    monthlyPrice: 2499,
    highlight: false,
    ctaText: "Start 20-Day Free Trial",
    ctaHref: "/wishlist",
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
