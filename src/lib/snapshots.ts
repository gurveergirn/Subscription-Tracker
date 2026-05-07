import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { normalizeToYearly } from "./money"
import type { Category, Subscription } from "../types"

function currentMonthKey(): string {
  return new Date().toISOString().slice(0, 7)
}

export async function upsertCurrentMonthSnapshot(
  uid: string,
  subs: Subscription[],
) {
  const active = subs.filter((s) => s.status === "active")
  const totalMonthly = active.reduce((sum, s) => sum + s.monthlyEquivalent, 0)
  const totalYearly = active.reduce(
    (sum, s) => sum + normalizeToYearly(s.cost, s.billingCycle),
    0,
  )
  const byCategory: Partial<Record<Category, number>> = {}
  for (const s of active) {
    byCategory[s.category] =
      (byCategory[s.category] ?? 0) + s.monthlyEquivalent
  }
  const month = currentMonthKey()
  await setDoc(
    doc(db, "users", uid, "snapshots", month),
    {
      month,
      totalMonthly,
      totalYearly,
      activeCount: active.length,
      byCategory,
      recordedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
