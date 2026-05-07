import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Subscription, SubscriptionInput } from "../types"
import { normalizeToMonthly } from "./money"

function subCol(uid: string) {
  return collection(db, "users", uid, "subscriptions")
}

function subDoc(uid: string, id: string) {
  return doc(db, "users", uid, "subscriptions", id)
}

export async function createSubscription(uid: string, input: SubscriptionInput) {
  await addDoc(subCol(uid), {
    serviceId: input.serviceId,
    name: input.name,
    logoUrl: input.logoUrl,
    brandColor: input.brandColor,
    category: input.category,
    tierName: input.tierName,
    cost: input.cost,
    billingCycle: input.billingCycle,
    monthlyEquivalent: normalizeToMonthly(input.cost, input.billingCycle),
    renewalDate: Timestamp.fromDate(input.renewalDate),
    status: input.status,
    trialEndsAt: input.trialEndsAt ? Timestamp.fromDate(input.trialEndsAt) : null,
    notes: input.notes,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateSubscription(
  uid: string,
  id: string,
  patch: Partial<SubscriptionInput>,
) {
  const ref = subDoc(uid, id)
  const data: Record<string, unknown> = {
    ...patch,
    updatedAt: serverTimestamp(),
  }
  if (patch.renewalDate)
    data.renewalDate = Timestamp.fromDate(patch.renewalDate)
  if ("trialEndsAt" in patch)
    data.trialEndsAt = patch.trialEndsAt
      ? Timestamp.fromDate(patch.trialEndsAt)
      : null
  if ("cost" in patch || "billingCycle" in patch) {
    const snap = await getDoc(ref)
    const current = snap.data() as Subscription | undefined
    const cost = patch.cost ?? current?.cost ?? 0
    const cycle = patch.billingCycle ?? current?.billingCycle ?? "monthly"
    data.monthlyEquivalent = normalizeToMonthly(cost, cycle)
  }
  await updateDoc(ref, data)
}

export async function deleteSubscription(uid: string, id: string) {
  await deleteDoc(subDoc(uid, id))
}

export function watchSubscriptions(
  uid: string,
  onChange: (subs: Subscription[]) => void,
) {
  const q = query(subCol(uid), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snap) => {
    const subs = snap.docs.map(
      (d) => ({ id: d.id, ...d.data() }) as Subscription,
    )
    onChange(subs)
  })
}
