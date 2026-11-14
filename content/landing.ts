export interface NavItem {
  label: string
  href: string
}

export interface IndustryItem {
  id: string
  name: string
  category: 'training' | 'rental' | 'event'
  description: string
  href: string
  icon: string
}

export interface ProblemSolution {
  category: string
  problem: string
  solution: string
  previewType: 'fees' | 'calendar' | 'dashboard' | 'leads' | 'staff' | 'reports'
}

export interface ComparisonRow {
  area: string
  manual: string
  automated: string
}

export interface StepItem {
  number: number
  title: string
  description: string
  visual: string
}

export interface FeatureCard {
  name: string
  desc: string
  icon: string
  microLabel?: string
}

export interface FeatureGroup {
  category: string
  icon: string
  features: FeatureCard[]
}

export interface ResourceCard {
  tag: string
  title: string
  description: string
  href: string
  readTime?: string
  gradient: string
}

export interface ModuleTab {
  id: string
  tab: string
  title: string
  description: string
  features: string[]
  rows: { name: string; meta: string; tag: string; tagColor: string }[]
  chartData: { label: string; primary: number; secondary: number }[]
  accentColor: string
}

export interface WhyUsItem {
  title: string
  description: string
  icon: string
  microLabel?: string
  featured?: boolean
}

export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlight: boolean
  badge?: string
}

export interface StatItem {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export interface FaqItem {
  question: string
  answer: string
  link?: string
  linkText?: string
}

export const LAST_REVIEWED_DATE = 'November 13, 2026'

export const navLinks: NavItem[] = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Features', href: '/features' },
  { label: 'Use Cases', href: '/use-cases' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
]

export const industries: IndustryItem[] = [
  {
    id: 'dance-academy',
    name: 'Dance Academy',
    category: 'training',
    description: 'Batches, fees, and attendance in one place.',
    href: '/solutions#dance-academy',
    icon: 'GraduationCap',
  },
  {
    id: 'music-school',
    name: 'Music School',
    category: 'training',
    description: 'Track instruments, 1-on-1 slots, and student progress.',
    href: '/solutions#music-school',
    icon: 'Music',
  },
  {
    id: 'swimming-academy',
    name: 'Swimming Academy',
    category: 'training',
    description: 'Manage lane capacity, coaches, and seasonal passes.',
    href: '/solutions#swimming-academy',
    icon: 'Waves',
  },
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    category: 'training',
    description: 'Belt progression, sparring schedules, and family billing.',
    href: '/solutions#martial-arts',
    icon: 'Swords',
  },
  {
    id: 'yoga-studio',
    name: 'Yoga Studio',
    category: 'training',
    description: 'Class packs, drop-ins, and recurring subscriptions.',
    href: '/solutions#yoga-studio',
    icon: 'Heart',
  },
  {
    id: 'tuition-centre',
    name: 'Tuition Centre',
    category: 'training',
    description: 'Subject batches, exam reports, and parent updates.',
    href: '/solutions#tuition-centre',
    icon: 'BookOpen',
  },
  {
    id: 'rental-business',
    name: 'Rental Business',
    category: 'rental',
    description: 'Real-time dispatch, inventory status, and deposits.',
    href: '/solutions#rental-business',
    icon: 'Package',
  },
  {
    id: 'event-company',
    name: 'Event Company',
    category: 'event',
    description: 'Budgets, vendor milestones, and client proposals.',
    href: '/solutions#event-company',
    icon: 'PartyPopper',
  },
  {
    id: 'wedding-planner',
    name: 'Wedding Planner',
    category: 'event',
    description: 'Checklists, RSVP tracking, and multi-day itinerary.',
    href: '/solutions#wedding-planner',
    icon: 'CalendarHeart',
  },
  {
    id: 'photography-studio',
    name: 'Photography Studio',
    category: 'rental',
    description: 'Shooting slots, gear checkout, and client delivery.',
    href: '/solutions#photography-studio',
    icon: 'Camera',
  },
]

export const heroData = {
  eyebrow: 'Built for Indian academies, rentals & events',
  headingBefore: 'Manage your entire business from ',
  headingGradient: 'one platform',
  lead: '1Grow is a cloud ERP for Training Institutes, Rental Businesses, and Event Companies. Track leads, manage teams, collect payments, and view reports from one dashboard. Replace WhatsApp, Excel, and paper registers with one smart platform.',
  primaryCta: 'Join Wishlist',
  secondaryCta: 'See how it works',
  microTrust: [
    'Built for India',
    'Support in Tamil, Hindi & English',
    'Replace WhatsApp + Excel',
  ],
}

export const marqueeItems = [
  { label: 'Student Management', icon: 'GraduationCap' },
  { label: 'Rental Management', icon: 'Package' },
  { label: 'Event Management', icon: 'PartyPopper' },
  { label: 'Multi-Branch Operations', icon: 'Building2' },
  { label: 'Billing & Payments', icon: 'CreditCard' },
  { label: 'Reports & Analytics', icon: 'BarChart3' },
  { label: 'Calendar & Scheduling', icon: 'CalendarDays' },
  { label: 'Inventory & Assets', icon: 'Warehouse' },
  { label: 'Business Insights', icon: 'Layers' },
]

export const platformTiles = [
  {
    id: 'training',
    name: 'Training',
    title: 'Training Management',
    desc: 'Batches, attendance, students, and auto fees in one place.',
    accent: '#8b5cf6',
    href: '/solutions#dance-academy',
    icon: 'GraduationCap',
  },
  {
    id: 'rental',
    name: 'Rental',
    title: 'Rental Operations',
    desc: 'Real-time equipment stock, dispatch orders, and returns.',
    accent: '#ff6b00',
    href: '/solutions#rental-business',
    icon: 'Package',
  },
  {
    id: 'event',
    name: 'Event',
    title: 'Event Management',
    desc: 'Proposals, task milestones, budget tracking, and crew teams.',
    accent: '#f43f5e',
    href: '/solutions#event-company',
    icon: 'PartyPopper',
  },
  {
    id: 'billing',
    name: 'Billing',
    title: 'Billing & Invoicing',
    desc: 'Instant payment links, WhatsApp reminders, and GST receipts.',
    accent: '#16a34a',
    href: '/features/fee-collection',
    icon: 'CreditCard',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    title: 'Live Reports',
    desc: 'Consolidated revenue, branch metrics, and business health.',
    accent: '#0891b2',
    href: '/features',
    icon: 'BarChart3',
  },
]

export const problems: ProblemSolution[] = [
  {
    category: 'Fee Collection',
    problem: 'Tracking fees with WhatsApp messages and Excel sheets',
    solution: '1Grow automates fee collection. Send payment links, auto-reminders, and instant receipts. No more manual follow-ups.',
    previewType: 'fees',
  },
  {
    category: 'Resource Scheduling',
    problem: 'Double-bookings for classes and equipment across branches',
    solution: 'See real-time availability for every branch, asset, and time slot. No overlaps, no conflicts, no confusion.',
    previewType: 'calendar',
  },
  {
    category: 'Executive Visibility',
    problem: 'No visibility into daily revenue or attendance numbers',
    solution: 'Live dashboards show revenue, attendance, and branch comparisons. Know your numbers anytime.',
    previewType: 'dashboard',
  },
  {
    category: 'Lead Follow-up',
    problem: 'Manually following up on every student enquiry',
    solution: 'Auto-capture leads from WhatsApp and web forms. Score, assign, and follow up without lifting a finger.',
    previewType: 'leads',
  },
  {
    category: 'Staff Operations',
    problem: 'Managing staff schedules across multiple locations',
    solution: 'Central staff management with role-based access. Spot conflicts before they happen. Assign with one click.',
    previewType: 'staff',
  },
  {
    category: 'Certificates & Documents',
    problem: 'Creating certificates and reports by hand',
    solution: 'Generate certificates, invoices, and reports in one click. Export to PDF, Excel, or CSV instantly.',
    previewType: 'reports',
  },
]

export const erpDefinition = {
  title: 'What is an ERP and why does your business need one?',
  text: 'An ERP (Enterprise Resource Planning) system is software that connects all parts of a business — students, inventory, billing, staff, and reports — in one unified platform. 1Grow is an ERP built specifically for Indian training academies, rental businesses, and event companies, replacing scattered WhatsApp chats and spreadsheets with real-time operational clarity.',
}

export const comparisonRows: ComparisonRow[] = [
  { area: 'Data Entry', manual: 'Manual in 3+ apps', automated: 'One dashboard, auto synced' },
  { area: 'Error Rate', manual: 'High — typos and missed chats', automated: 'Low — validation and auto-checks' },
  { area: 'Fee Collection', manual: '2–3 days per cycle', automated: '5 minutes per cycle' },
  { area: 'Reports', manual: 'Build from scratch each time', automated: 'Live and auto-generated' },
  { area: 'Staff Access', manual: 'Shared passwords on WhatsApp', automated: 'Role-based, secure logins' },
]

export const steps: StepItem[] = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Sign up in seconds with a 20-day free trial. No credit card required and no commitment.',
    visual: 'Quick registration form with SMS verification',
  },
  {
    number: 2,
    title: 'Set Up Your Business',
    description: 'Add your branches, staff members, and customize branding to match your business identity.',
    visual: 'Branch & staff roles configuration',
  },
  {
    number: 3,
    title: 'Import Your Data',
    description: 'Add customers, students, inventory items, events, or migrate your existing records seamlessly.',
    visual: '1-click CSV/Excel smart import',
  },
  {
    number: 4,
    title: 'Manage Daily Operations',
    description: 'Track attendance, collect fees, send notifications, and manage teams — all automated.',
    visual: 'Live attendance & fee status register',
  },
  {
    number: 5,
    title: 'Grow Your Business',
    description: 'Leverage analytics dashboards, revenue reports, and smart insights to drive expansion.',
    visual: 'Executive performance & revenue analytics',
  },
]

export const featureGroups: FeatureGroup[] = [
  {
    category: 'Admissions & Academies',
    icon: 'GraduationCap',
    features: [
      { icon: 'Users', name: 'Student Management', desc: 'Track each student from enquiry to enrollment to graduation', microLabel: '/Enroll' },
      { icon: 'ClipboardList', name: 'Attendance', desc: 'Mark attendance in seconds from any phone. One-tap check-in', microLabel: '<Track>' },
      { icon: 'Wallet', name: 'Fee Collection', desc: 'Auto send payment links, reminders, and digital receipts', microLabel: '{Collect}' },
      { icon: 'CalendarDays', name: 'Batch Scheduling', desc: 'Plan classes, trainers, and rooms. No more double-bookings', microLabel: '[Schedule]' },
      { icon: 'MessageSquare', name: 'WhatsApp Notifications', desc: 'Send updates to parents and students on auto-pilot', microLabel: '/Notify' },
    ],
  },
  {
    category: 'Inventory & Rentals',
    icon: 'Package',
    features: [
      { icon: 'Package', name: 'Rental Booking', desc: 'Check stock in real time. Book with a visual timeline calendar', microLabel: '/Dispatch' },
      { icon: 'CalendarCheck', name: 'Availability Calendar', desc: 'Know what gear is out, returning, or available at a glance', microLabel: '<Reserve>' },
      { icon: 'FileText', name: 'Asset Tracking', desc: 'Serial numbers, service records, and deposit refund processing', microLabel: '{Inspect}' },
      { icon: 'Smartphone', name: 'Mobile App', desc: 'Run your warehouse checks and dispatch orders from any smartphone', microLabel: '[Mobile]' },
      { icon: 'BarChart3', name: 'Usage Analytics', desc: 'See which inventory items generate highest ROI and utilization', microLabel: '/Insights' },
    ],
  },
  {
    category: 'Events & Projects',
    icon: 'PartyPopper',
    features: [
      { icon: 'Users', name: 'Event CRM', desc: 'Capture enquiries and turn leads into confirmed event bookings', microLabel: '/Pipeline' },
      { icon: 'UserCheck', name: 'Team Assignment', desc: 'Assign vendors, coordinators, and crew members in one click', microLabel: '<Assign>' },
      { icon: 'CheckSquare', name: 'Task Checklists', desc: 'Track milestones, tasks, and stage checklists in real time', microLabel: '{Tasks}' },
      { icon: 'Truck', name: 'Vendor Coordination', desc: 'Manage supplier delivery dates, quotes, and milestone payouts', microLabel: '[Vendors]' },
      { icon: 'Smartphone', name: 'Budget Tracking', desc: 'Live expense monitoring and client profitability per event', microLabel: '/Budget' },
    ],
  },
]

export const resourceCards: ResourceCard[] = [
  {
    tag: 'Guide',
    title: 'Why Training Academies Should Replace Spreadsheets with a SaaS ERP',
    description: 'Discover how digitizing your academy operations can save 10+ hours per week and reduce fee collection time by 70%.',
    href: '/blog/replacing-spreadsheets-with-saas-erp',
    readTime: '5 min read',
    gradient: 'from-blue-600/20 to-indigo-600/10',
  },
  {
    tag: 'Tutorial',
    title: 'Getting Started with 1Grow: Complete Platform Onboarding',
    description: 'Step-by-step tutorial on configuring multi-branch locations, staff roles, and importing student records.',
    href: '/tutorials/getting-started-with-1Grow',
    readTime: '6 min read',
    gradient: 'from-sky-600/20 to-blue-600/10',
  },
  {
    tag: 'Blog',
    title: 'Managing a Multi-Branch Rental Business Without Chaos',
    description: 'Learn how rental businesses use cloud inventory management to track assets across locations in real time.',
    href: '/blog/multi-branch-rental-business-management',
    readTime: '4 min read',
    gradient: 'from-cyan-600/20 to-teal-600/10',
  },
]

export const modulesData: ModuleTab[] = [
  {
    id: 'training',
    tab: 'Training',
    title: 'Training Management',
    description:
      'Run your academy end to end. Capture enquiries, enroll students, schedule batches, track attendance, and collect fees automatically. Works for dance, music, tuition, yoga, martial arts, and swimming academies.',
    features: [
      'Lead Management & Enquiry Pipeline',
      'Student Enrollment & Batch Scheduling',
      'Digital Attendance Tracking',
      'Automated WhatsApp Fee Reminders',
      'Student Progress Reports & Certificates',
      'Multi-Branch Consolidated Dashboard',
    ],
    rows: [
      { name: 'Bharatanatyam — Batch A', meta: '24 students · Morning 9:00 AM', tag: 'Active', tagColor: 'bg-emerald-500/20 text-emerald-400' },
      { name: 'Vocal Music — Evening', meta: '18 students · Mon / Wed / Fri', tag: 'Active', tagColor: 'bg-emerald-500/20 text-emerald-400' },
      { name: 'Yoga Studio — Weekend', meta: '31 students · 7:00 AM', tag: 'Enrolling', tagColor: 'bg-amber-500/20 text-amber-400' },
    ],
    chartData: [
      { label: 'Jan', primary: 65, secondary: 40 },
      { label: 'Feb', primary: 75, secondary: 48 },
      { label: 'Mar', primary: 70, secondary: 52 },
      { label: 'Apr', primary: 85, secondary: 60 },
      { label: 'May', primary: 90, secondary: 72 },
      { label: 'Jun', primary: 98, secondary: 82 },
    ],
    accentColor: '#ff6b00',
  },
  {
    id: 'rental',
    tab: 'Rental',
    title: 'Rental Management',
    description:
      'Track every item from booking to return. Know what is available, out for delivery, or in maintenance at a glance. Made for equipment rental, costume rental, and event supply businesses.',
    features: [
      'Real-Time Inventory Availability Calendar',
      'Dispatch Orders & QR Return Processing',
      'Deposit Tracking & Damage Assessment',
      'Vehicle & Equipment Maintenance Logs',
      'Customer Rental Agreements & Signatures',
      'Multi-Branch Stock Transfers',
    ],
    rows: [
      { name: 'Stage Lighting Kit ×3', meta: 'Out — returns Sat afternoon', tag: 'Booked', tagColor: 'bg-orange-500/20 text-orange-400' },
      { name: 'Costume Set — Royal ×6', meta: 'Warehouse A · Ready for dispatch', tag: 'Ready', tagColor: 'bg-emerald-500/20 text-emerald-400' },
      { name: 'Sound System Pro ×2', meta: 'Service center · Under inspection', tag: 'Service', tagColor: 'bg-amber-500/20 text-amber-400' },
    ],
    chartData: [
      { label: 'Jan', primary: 55, secondary: 30 },
      { label: 'Feb', primary: 68, secondary: 42 },
      { label: 'Mar', primary: 82, secondary: 50 },
      { label: 'Apr', primary: 76, secondary: 45 },
      { label: 'May', primary: 88, secondary: 62 },
      { label: 'Jun', primary: 95, secondary: 70 },
    ],
    accentColor: '#f43f5e',
  },
  {
    id: 'event',
    tab: 'Event',
    title: 'Event Management',
    description:
      'Plan and deliver great events. From first enquiry and quote to team setup, budget tracking, and closure reports. Built for event companies, wedding planners, and photo studios.',
    features: [
      'Interactive Event Lead Tracking & CRM',
      'Instant Quotation & Proposal Generator',
      'Team & Vendor Coordinator Roster',
      'Real-Time Milestone Task Checklists',
      'Live Expense & Profitability Monitoring',
      'Post-Event Audit & Closure Reports',
    ],
    rows: [
      { name: 'Sharma Wedding Reception', meta: '₹4.2L budget · 12 tasks remaining', tag: 'Planning', tagColor: 'bg-purple-500/20 text-purple-400' },
      { name: 'Corporate Tech Gala', meta: '₹8.5L budget · On track for setup', tag: 'On Track', tagColor: 'bg-emerald-500/20 text-emerald-400' },
      { name: 'Annual Cultural Day Show', meta: '₹2.1L budget · Awaiting client approval', tag: 'Pending', tagColor: 'bg-amber-500/20 text-amber-400' },
    ],
    chartData: [
      { label: 'Jan', primary: 40, secondary: 25 },
      { label: 'Feb', primary: 60, secondary: 38 },
      { label: 'Mar', primary: 72, secondary: 50 },
      { label: 'Apr', primary: 80, secondary: 60 },
      { label: 'May', primary: 92, secondary: 68 },
      { label: 'Jun', primary: 100, secondary: 78 },
    ],
    accentColor: '#8b5cf6',
  },
]

export const reasons: WhyUsItem[] = [
  {
    icon: 'Users',
    title: 'Purpose-Built for Academies',
    description:
      'Not a generic CRM. Built for training institutes, rental firms, and event companies. Our features match how you work.',
    microLabel: '/DomainFit',
    featured: true,
  },
  {
    icon: 'Wallet',
    title: 'Automated Fee Collection',
    description:
      'Send WhatsApp reminders, payment links, and digital receipts on auto-pilot. Zero manual work for your team.',
    microLabel: '<AutoPay>',
  },
  {
    icon: 'Bell',
    title: 'WhatsApp Automation',
    description:
      'Send attendance, fee alerts, class updates, and promotions via WhatsApp. All automatic, all on time.',
    microLabel: '{WhatsApp}',
  },
  {
    icon: 'BarChart3',
    title: 'Real-Time Analytics',
    description:
      'See revenue, attendance, and branch comparisons on live dashboards. Data you can act on, right now.',
    microLabel: '[Analytics]',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure & Private',
    description:
      'Role-based access, encrypted data, audit logs, and true multi-tenant isolation. Each business stays separate.',
    microLabel: '/Encrypted',
  },
  {
    icon: 'Layers',
    title: 'Multi-Branch Ready',
    description:
      'Manage unlimited branches from one dashboard. See cross-location reports, staff, and inventory in one view.',
    microLabel: '<MultiBranch>',
  },
  {
    icon: 'HeadphonesIcon',
    title: 'Local Support',
    description:
      'Get help in Tamil, Hindi, and English. We understand Indian businesses because we are one.',
    microLabel: '{Support}',
  },
  {
    icon: 'Check',
    title: '20-Day Free Trial',
    description:
      'Full access to all modules. Unlimited staff users. Mobile access included. No credit card needed.',
    microLabel: '[ZeroRisk]',
  },
]

export const plans: PricingPlan[] = [
  {
    name: 'Solo Module',
    price: '₹999',
    period: '/month',
    description: 'Choose any one module — Training, Rental, or Event',
    features: ['5 Staff Users', '1 Branch', '5 GB Cloud Storage', '500 Active Records'],
    highlight: false,
  },
  {
    name: 'Business Plan',
    price: '₹1,899',
    period: '/month',
    description: 'Choose any two modules with advanced automation',
    features: [
      '15 Staff Users',
      '3 Branches',
      '25 GB Cloud Storage',
      '5,000 Active Records',
      'WhatsApp API Integration',
      'Priority Phone Support',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Complete Plan',
    price: '₹2,499',
    period: '/month',
    description: 'All modules included with full multi-branch power',
    features: [
      '50 Staff Users',
      '10 Branches',
      '100 GB Cloud Storage',
      'Unlimited Records',
      'Custom Domain Support',
      'Dedicated Account Manager',
    ],
    highlight: false,
  },
]

export const statItems: StatItem[] = [
  { value: 20, suffix: '-day', label: 'Free trial with full module access' },
  { value: 3, label: 'Languages supported (Tamil, Hindi, English)' },
  { value: 10, suffix: '+', label: 'Specialized industries served' },
  { value: 999, prefix: '₹', suffix: '/mo', label: 'Transparent starting plan' },
]

export const blogPosts = [
  {
    slug: 'replacing-spreadsheets-with-saas-erp',
    title: 'Why Training Academies Should Replace Spreadsheets with a SaaS ERP',
    description: 'Discover how digitizing your academy operations can save 10+ hours per week and reduce fee collection time by 70%.',
    category: 'Industry Insights',
    readingTime: 5,
    date: 'Jan 15, 2025',
  },
  {
    slug: 'multi-branch-rental-business-management',
    title: 'Managing a Multi-Branch Rental Business Without Chaos',
    description: 'Learn how rental businesses use cloud inventory management to track assets across locations in real time.',
    category: 'Industry Insights',
    readingTime: 4,
    date: 'Jan 22, 2025',
  },
  {
    slug: 'event-management-budget-tracking',
    title: 'How Event Companies Track Budgets and Profitability in Real Time',
    description: 'Replace manual budget spreadsheets with real-time tracking dashboards that show profitability per event.',
    category: 'Product Updates',
    readingTime: 4,
    date: 'Feb 1, 2025',
  },
]

export const faqs: FaqItem[] = [
  {
    question: 'Can I use only one module?',
    answer: 'Yes. You can start with just Training, Rental, or Event management. Pay only for what you use. Add more modules anytime as your business grows.',
    link: '/features',
    linkText: 'Explore all features',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Every plan comes with a 20-day free trial. You get full access to all modules. No credit card needed. No risk.',
    link: '/pricing',
    linkText: 'View pricing plans',
  },
  {
    question: 'Can I manage multiple branches?',
    answer: 'Yes. Multi-branch support is built in. Manage locations, staff, and inventory across all branches from one dashboard. Owners see the full picture at a glance.',
  },
  {
    question: 'Do you support mobile devices?',
    answer: '1Grow works on any device. Your team can manage attendance, bookings, payments, and tasks from phones, tablets, or desktops. The full app is mobile-friendly.',
    link: '/features/mobile-app',
    linkText: 'Learn about the mobile app',
  },
  {
    question: 'Is my data secure?',
    answer: 'Your data is safe with role-based access, audit logs, and encryption at rest and in transit. Each business stays fully separate with true multi-tenant isolation.',
    link: '/features/multi-tenant-architecture',
    linkText: 'Learn about our security',
  },
  {
    question: 'What is an ERP and why do I need one?',
    answer: 'ERP stands for Enterprise Resource Planning. It is software that connects all parts of your business — students, inventory, billing, and reports — in one place. Instead of jumping between WhatsApp, Excel, and registers, you manage everything from one dashboard.',
  },
  {
    question: 'How is 1Grow different from using WhatsApp and Excel?',
    answer: 'WhatsApp and Excel are not built for business operations. With 1Grow, you get auto fee reminders, real-time inventory, attendance tracking, and live reports. No manual data entry. No lost messages. Everything is in one place.',
    link: '/blog/save-10-hours-weekly-single-erp',
    linkText: 'Read how businesses save 10+ hours weekly',
  },
  {
    question: 'What industries does 1Grow serve?',
    answer: '1Grow is built for three key industries: Training Institutes (music schools, dance studios, tuition centers, coaching classes), Rental Businesses (equipment, vehicles, venues, party supplies), and Event Companies (wedding planners, corporate events, cultural programs). Each industry gets tailored workflows and features.',
    link: '/solutions',
    linkText: 'View industry solutions',
  },
  {
    question: 'How much does 1Grow cost?',
    answer: '1Grow offers transparent pricing starting at ₹999/month for the Starter plan. The Business plan at ₹1,899/month includes all modules and priority support. Enterprise plans with custom features are available on request. All plans include a 20-day free trial.',
    link: '/pricing',
    linkText: 'See detailed pricing',
  },
  {
    question: 'Can I migrate from my existing software?',
    answer: 'Yes. 1Grow supports data import from Excel/CSV files and can integrate with your existing tools. Our onboarding team provides free data migration assistance to ensure a smooth transition with zero data loss.',
    link: '/tutorials',
    linkText: 'Check migration tutorials',
  },
  {
    question: 'Does 1Grow support multiple languages?',
    answer: 'Yes. 1Grow supports English, Tamil, and Hindi. Your team and customers can use the platform in their preferred language. Additional languages are planned for future releases.',
  },
  {
    question: 'Can I try 1Grow before paying?',
    answer: 'Yes. Start with a 20-day free trial. You get full access to every feature. Invite your team. Import your data. If it works for you, choose a plan. If not, no charge.',
  },
  {
    question: 'How does fee collection work?',
    answer: 'The platform automates fee collection with WhatsApp payment links, email reminders, and SMS notifications. Students and parents receive payment requests automatically, and receipts are generated instantly upon payment confirmation.',
    link: '/features/fee-collection',
    linkText: 'See fee collection features',
  },
]

export const finalCtaData = {
  heading: 'Ready to transform your business operations?',
  lead: 'Replace WhatsApp, Excel and paper registers with one platform built for Indian academies, rental businesses and event companies.',
  primaryCta: 'Join Wishlist',
  secondaryCta: 'Talk to us on WhatsApp',
  whatsappUrl: 'https://wa.me/919566372450',
}

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Use Cases', href: '/use-cases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Tutorials', href: '/tutorials' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Code of Conduct', href: '/code-of-conduct' },
      { label: 'Community Guidelines', href: '/community-guidelines' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Accessibility', href: '/accessibility-statement' },
    ],
  },
]
