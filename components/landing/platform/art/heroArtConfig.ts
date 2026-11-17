export interface TileConfig {
  title: string
  icon: string
  delay: number
}

export interface ModuleArtConfig {
  id: string
  wordmark: string
  symbol: 'cap' | 'box' | 'popper' | 'coin' | 'crates' | 'bars'
  accentGlow: string
  tiles: TileConfig[]
}

export const MODULE_ART_CONFIG: Record<string, ModuleArtConfig> = {
  training: {
    id: 'training',
    wordmark: 'Training',
    symbol: 'cap',
    accentGlow: 'rgba(139, 92, 246, 0.45)',
    tiles: [
      { title: 'Batch Scheduling', icon: 'calendar', delay: 0 },
      { title: '1-Tap Attendance', icon: 'check', delay: 0.06 },
      { title: 'Fee Management', icon: 'wallet', delay: 0.12 },
      { title: 'WhatsApp Reminders', icon: 'bell', delay: 0.18 },
    ],
  },
  rental: {
    id: 'rental',
    wordmark: 'Rental',
    symbol: 'box',
    accentGlow: 'rgba(1, 118, 211, 0.45)',
    tiles: [
      { title: 'Asset Availability', icon: 'box', delay: 0 },
      { title: 'QR Inspections', icon: 'qr', delay: 0.06 },
      { title: 'Security Deposits', icon: 'shield', delay: 0.12 },
      { title: 'Overdue Tracking', icon: 'clock', delay: 0.18 },
    ],
  },
  event: {
    id: 'event',
    wordmark: 'Event Management',
    symbol: 'popper',
    accentGlow: 'rgba(229, 72, 77, 0.45)',
    tiles: [
      { title: 'Instant Quotations', icon: 'file', delay: 0 },
      { title: 'Crew & Vendor Roster', icon: 'users', delay: 0.06 },
      { title: 'Milestone Tasks', icon: 'check', delay: 0.12 },
      { title: 'Live Budget & Margin', icon: 'trending', delay: 0.18 },
    ],
  },
  billing: {
    id: 'billing',
    wordmark: 'Billing',
    symbol: 'coin',
    accentGlow: 'rgba(46, 132, 74, 0.45)',
    tiles: [
      { title: 'WhatsApp Links', icon: 'message', delay: 0 },
      { title: 'GST Invoicing', icon: 'fileCheck', delay: 0.06 },
      { title: 'Digital Receipts', icon: 'phone', delay: 0.12 },
      { title: 'Auto-Reconciliation', icon: 'clock', delay: 0.18 },
    ],
  },
  inventory: {
    id: 'inventory',
    wordmark: 'Inventory',
    symbol: 'crates',
    accentGlow: 'rgba(194, 87, 12, 0.45)',
    tiles: [
      { title: 'Serial & Barcode', icon: 'barcode', delay: 0 },
      { title: 'Branch Transfers', icon: 'building', delay: 0.06 },
      { title: 'Maintenance Logs', icon: 'shield', delay: 0.12 },
      { title: 'Low-Stock Alerts', icon: 'bell', delay: 0.18 },
    ],
  },
  analytics: {
    id: 'analytics',
    wordmark: 'Analytics',
    symbol: 'bars',
    accentGlow: 'rgba(13, 148, 136, 0.45)',
    tiles: [
      { title: 'Consolidated Revenue', icon: 'trending', delay: 0 },
      { title: 'Student Retention', icon: 'users', delay: 0.06 },
      { title: 'Branch Benchmarking', icon: 'building', delay: 0.12 },
      { title: 'Utilization Rates', icon: 'bars', delay: 0.18 },
    ],
  },
}
