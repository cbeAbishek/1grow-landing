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
  characterName: string;
  characterRole: string;
  features: string[]; // Package contents shown on the card
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
    features: [
      "Any one module: Training, Rental or Events",
      "Lead & Customer Management",
      "Payment Tracking with WhatsApp Reminders",
      "Attendance & Live Dashboard",
      "Reports + PDF / Excel / CSV Export",
      "5 staff users · 1 branch",
      "500 records · 5 GB storage",
    ],
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
    features: [
      "Any two modules: Training, Rental or Events",
      "Everything in Solo, plus:",
      "Multi-Branch Support (3 Locations)",
      "Team, Role & Approval Workflows",
      "Customer & Student Portals",
      "WhatsApp Automation + Advanced Reports",
      "15 staff users · 25 GB storage",
    ],
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
    features: [
      "All modules: Training, Rental & Events",
      "Everything in Business, plus:",
      "AI Insights & Predictive Revenue Forecasting",
      "Workflow Automation & Advanced Analytics",
      "Unlimited Records · Multi-Service Enterprise",
      "50 staff users · 10 branches",
      "100 GB storage",
    ],
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
