import type { Timestamp } from "firebase/firestore"

export type BillingCycle = "monthly" | "yearly" | "weekly" | "quarterly"

export type Category =
  | "Entertainment"
  | "Music"
  | "Gaming"
  | "Storage & Productivity"
  | "Fitness & Health"
  | "News & Reading"
  | "Security & VPN"
  | "AI Tools"
  | "Developer Tools"
  | "Social & Communication"
  | "Design & Creative"
  | "Education"
  | "Food & Lifestyle"

export const CATEGORIES: Category[] = [
  "Entertainment",
  "Music",
  "Gaming",
  "Storage & Productivity",
  "Fitness & Health",
  "News & Reading",
  "Security & VPN",
  "AI Tools",
  "Developer Tools",
  "Social & Communication",
  "Design & Creative",
  "Education",
  "Food & Lifestyle",
]

export type ServiceTier = {
  name: string
  price: number
  cycle: BillingCycle
}

export type Service = {
  id: string
  name: string
  domain: string
  category: Category
  brandColor: string
  tiers: ServiceTier[]
}

export type SubscriptionStatus = "active" | "paused" | "trial"

export type Currency = "USD" | "CAD" | "EUR" | "GBP"

export type Subscription = {
  id: string
  serviceId: string | null
  name: string
  logoUrl: string
  brandColor: string
  category: Category
  tierName: string
  cost: number
  billingCycle: BillingCycle
  monthlyEquivalent: number
  renewalDate: Timestamp
  status: SubscriptionStatus
  trialEndsAt: Timestamp | null
  notes: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type SubscriptionInput = {
  serviceId: string | null
  name: string
  logoUrl: string
  brandColor: string
  category: Category
  tierName: string
  cost: number
  billingCycle: BillingCycle
  renewalDate: Date
  status: SubscriptionStatus
  trialEndsAt: Date | null
  notes: string
}
