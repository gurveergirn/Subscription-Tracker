import { findService } from "../data/services"
import type { Category, Subscription } from "../types"
import { daysUntil } from "./dates"
import { cycleSuffix } from "./money"

type FormatMoney = (usd: number) => string

export type InsightKind =
  | "renewal"
  | "trial"
  | "redundancy"
  | "savings"
  | "duplicate"

export type InsightTone = "warning" | "info" | "success"

export type Insight = {
  id: string
  kind: InsightKind
  tone: InsightTone
  title: string
  detail: string
}

const REDUNDANT_CATEGORIES: Category[] = [
  "Music",
  "Entertainment",
  "News & Reading",
  "Storage & Productivity",
]

export function computeInsights(
  subs: Subscription[],
  format: FormatMoney,
): Insight[] {
  const insights: Insight[] = []
  const active = subs.filter(
    (s) => s.status === "active" || s.status === "trial",
  )

  // Renewal alerts (active only)
  const upcoming = subs.filter((s) => {
    if (s.status !== "active") return false
    const d = daysUntil(s.renewalDate)
    return d >= 0 && d <= 7
  })
  if (upcoming.length > 0) {
    insights.push({
      id: "renewal-alert",
      kind: "renewal",
      tone: "warning",
      title: `${upcoming.length} renewal${upcoming.length === 1 ? "" : "s"} in the next 7 days`,
      detail: upcoming.map((s) => s.name).join(", "),
    })
  }

  // Trials expiring soon
  for (const s of subs) {
    if (s.status !== "trial" || !s.trialEndsAt) continue
    const d = daysUntil(s.trialEndsAt)
    if (d < 0 || d > 3) continue
    const when = d === 0 ? "today" : d === 1 ? "tomorrow" : `in ${d} days`
    insights.push({
      id: `trial-${s.id}`,
      kind: "trial",
      tone: "warning",
      title: `${s.name} trial ends ${when}`,
      detail: `Will convert to ${format(s.cost)}${cycleSuffix(s.billingCycle)} unless you cancel.`,
    })
  }

  // Redundancy across same category
  for (const cat of REDUNDANT_CATEGORIES) {
    const inCat = active.filter((s) => s.category === cat)
    if (inCat.length >= 2) {
      insights.push({
        id: `redundancy-${cat}`,
        kind: "redundancy",
        tone: "info",
        title: `${inCat.length} ${cat.toLowerCase()} services`,
        detail: `${inCat.map((s) => s.name).join(" + ")} — could you do without one?`,
      })
    }
  }

  // Annual-vs-monthly savings
  for (const s of active) {
    if (s.billingCycle !== "monthly" || !s.serviceId) continue
    const service = findService(s.serviceId)
    if (!service) continue
    const yearlyTier = service.tiers.find((t) => t.cycle === "yearly")
    if (!yearlyTier) continue
    const yearlyEquivalent = s.cost * 12
    const savings = yearlyEquivalent - yearlyTier.price
    if (savings >= 5) {
      insights.push({
        id: `savings-${s.id}`,
        kind: "savings",
        tone: "success",
        title: `Save ${format(savings)}/yr on ${s.name}`,
        detail: `Switch to ${yearlyTier.name} (${format(yearlyTier.price)}/yr).`,
      })
    }
  }

  return insights
}
