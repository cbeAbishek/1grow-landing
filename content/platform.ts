export interface PlatformCardData {
  id: string
  slug: string
  title: string
  headline: string
  description: string
  ctaText: string
  ctaHref: string
  gradient: string
  icon: string
  accentColor: string
}

export const PLATFORM_CARDS: PlatformCardData[] = [
  {
    id: 'training',
    slug: 'training',
    title: 'Training',
    headline: 'Run every batch, student and fee from one place',
    description:
      'Manage student enrollments, batches, attendance, and fee collection automatically. Built for dance academies, music schools, tuition centers, yoga, and martial arts.',
    ctaText: 'Explore Training',
    ctaHref: '/solutions#dance-academy',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7526e3 100%)',
    icon: 'GraduationCap',
    accentColor: '#8b5cf6',
  },
  {
    id: 'rental',
    slug: 'rental',
    title: 'Rental',
    headline: "Know what's available before you say yes",
    description:
      'Real-time equipment availability calendar, dispatch tracking, QR-based return inspections, and security deposit management without spreadsheet errors.',
    ctaText: 'Explore Rental',
    ctaHref: '/solutions#rental-business',
    gradient: 'linear-gradient(135deg, #014486 0%, #0176d3 100%)',
    icon: 'Package',
    accentColor: '#0176d3',
  },
  {
    id: 'event',
    slug: 'event',
    title: 'Event Management',
    headline: 'From proposal to post-event, nothing slips',
    description:
      'Interactive CRM, instant quotation builder, vendor coordinators roster, milestone task checklists, and live expense and profitability monitoring per event.',
    ctaText: 'Explore Events',
    ctaHref: '/solutions#event-company',
    gradient: 'linear-gradient(135deg, #9f1d1d 0%, #e5484d 100%)',
    icon: 'PartyPopper',
    accentColor: '#e5484d',
  },
  {
    id: 'billing',
    slug: 'billing',
    title: 'Billing',
    headline: 'Get paid faster, without chasing',
    description:
      'Automated WhatsApp payment links, instant digital receipts, automated fee reminders, and GST invoicing that reconciles in real time.',
    ctaText: 'Explore Billing',
    ctaHref: '/features/fee-collection',
    gradient: 'linear-gradient(135deg, #14532d 0%, #2e844a 100%)',
    icon: 'CreditCard',
    accentColor: '#2e844a',
  },
  {
    id: 'inventory',
    slug: 'inventory',
    title: 'Inventory',
    headline: 'Every asset, accounted for', // DRAFT – needs approval
    description:
      'Track serial numbers, maintenance cycles, inter-branch stock transfers, and automated low-stock alerts across all your warehouse locations.',
    ctaText: 'Explore Inventory',
    ctaHref: '/features',
    gradient: 'linear-gradient(135deg, #9a3412 0%, #c2570c 100%)',
    icon: 'Warehouse',
    accentColor: '#c2570c',
  },
  {
    id: 'analytics',
    slug: 'analytics',
    title: 'Analytics',
    headline: 'See the whole business in one dashboard',
    description:
      'Consolidated revenue reporting, student retention trends, branch performance comparison, and actionable business insights updated live.',
    ctaText: 'Explore Analytics',
    ctaHref: '/features',
    gradient: 'linear-gradient(135deg, #0b4f4a 0%, #0d9488 100%)',
    icon: 'BarChart3',
    accentColor: '#0d9488',
  },
]
