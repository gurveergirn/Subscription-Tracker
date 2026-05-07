import type { BillingCycle, Currency } from "../types"

export function normalizeToMonthly(price: number, cycle: BillingCycle): number {
  switch (cycle) {
    case "monthly":
      return price
    case "yearly":
      return price / 12
    case "weekly":
      return price * (52 / 12)
    case "quarterly":
      return price / 3
  }
}

export function normalizeToYearly(price: number, cycle: BillingCycle): number {
  switch (cycle) {
    case "monthly":
      return price * 12
    case "yearly":
      return price
    case "weekly":
      return price * 52
    case "quarterly":
      return price * 4
  }
}

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  CAD: "CA$",
  EUR: "€",
  GBP: "£",
}

// Display-only fixed conversion rates (USD base). Live FX is a v1.1 feature.
const CURRENCY_RATE: Record<Currency, number> = {
  USD: 1,
  CAD: 1.37,
  EUR: 0.92,
  GBP: 0.79,
}

export function formatMoney(usd: number, currency: Currency = "USD"): string {
  const value = usd * CURRENCY_RATE[currency]
  return `${CURRENCY_SYMBOL[currency]}${value.toFixed(2)}`
}

export function cycleSuffix(cycle: BillingCycle): string {
  return {
    monthly: "/mo",
    yearly: "/yr",
    weekly: "/wk",
    quarterly: "/qtr",
  }[cycle]
}
