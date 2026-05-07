import { Timestamp } from "firebase/firestore"

export function toDate(
  ts: Timestamp | Date | null | undefined,
): Date | null {
  if (!ts) return null
  if (ts instanceof Date) return ts
  if (ts instanceof Timestamp) return ts.toDate()
  return null
}

export function daysUntil(
  ts: Timestamp | Date | null | undefined,
): number {
  const d = toDate(ts)
  if (!d) return 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(d)
  target.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

export function renewalLabel(
  ts: Timestamp | Date | null | undefined,
): string {
  const d = toDate(ts)
  if (!d) return ""
  const days = daysUntil(ts)
  if (days < 0) {
    const ago = Math.abs(days)
    return `${ago} day${ago === 1 ? "" : "s"} ago`
  }
  if (days === 0) return "Today"
  if (days === 1) return "Tomorrow"
  if (days < 14) return `in ${days} days`
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(d)
}

export function formatDate(
  ts: Timestamp | Date | null | undefined,
): string {
  const d = toDate(ts)
  if (!d) return ""
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d)
}

export function toDateInputValue(
  ts: Timestamp | Date | null | undefined,
): string {
  const d = toDate(ts)
  if (!d) return ""
  return d.toISOString().slice(0, 10)
}
