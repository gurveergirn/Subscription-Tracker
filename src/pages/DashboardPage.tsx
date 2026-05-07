import { useEffect, useMemo, useState } from "react"
import { Plus } from "lucide-react"
import TopBar from "../components/layout/TopBar"
import { useAuth } from "../lib/auth"
import { upsertCurrentMonthSnapshot } from "../lib/snapshots"
import AddSubscriptionModal from "../components/add/AddSubscriptionModal"
import ActiveSubscriptions from "../components/dashboard/ActiveSubscriptions"
import CategoryDonutChart from "../components/dashboard/CategoryDonutChart"
import SmartInsightsPanel from "../components/dashboard/SmartInsightsPanel"
import UpcomingRenewals from "../components/dashboard/UpcomingRenewals"
import SubscriptionDetailDrawer from "../components/detail/SubscriptionDetailDrawer"
import EmptyState from "../components/common/EmptyState"
import { DashboardSkeleton } from "../components/common/Skeleton"
import { useToast } from "../components/common/Toast"
import { useSubscriptions } from "../hooks/useSubscriptions"
import { normalizeToYearly } from "../lib/money"
import { useMoney } from "../lib/currency"
import type { SubscriptionInput } from "../types"

export default function DashboardPage() {
  const { user } = useAuth()
  const { format } = useMoney()
  const toast = useToast()
  const { subscriptions, loading, add, update, remove } = useSubscriptions()
  const [addOpen, setAddOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = selectedId
    ? (subscriptions.find((s) => s.id === selectedId) ?? null)
    : null

  useEffect(() => {
    if (loading || !user) return
    upsertCurrentMonthSnapshot(user.uid, subscriptions).catch(() => {})
  }, [loading, subscriptions, user])

  const existingServiceIds = useMemo(
    () =>
      subscriptions
        .map((s) => s.serviceId)
        .filter((id): id is string => Boolean(id)),
    [subscriptions],
  )

  const counted = useMemo(
    () => subscriptions.filter((s) => s.status === "active"),
    [subscriptions],
  )

  const totalMonthly = counted.reduce((sum, s) => sum + s.monthlyEquivalent, 0)
  const totalYearly = counted.reduce(
    (sum, s) => sum + normalizeToYearly(s.cost, s.billingCycle),
    0,
  )

  async function handleAdd(input: SubscriptionInput) {
    try {
      await add(input)
      toast.success(`${input.name} added`)
    } catch {
      toast.error("Couldn't add subscription. Please try again.")
      throw new Error("add failed")
    }
  }

  async function handleUpdate(
    id: string,
    patch: Partial<SubscriptionInput>,
  ) {
    try {
      await update(id, patch)
      toast.success("Saved")
    } catch {
      toast.error("Couldn't save changes.")
      throw new Error("update failed")
    }
  }

  async function handleDelete(id: string) {
    const sub = subscriptions.find((s) => s.id === id)
    try {
      await remove(id)
      toast.success(`${sub?.name ?? "Subscription"} deleted`)
    } catch {
      toast.error("Couldn't delete subscription.")
      throw new Error("delete failed")
    }
  }

  const stats = [
    { label: "Monthly", value: format(totalMonthly) },
    { label: "Yearly", value: format(totalYearly) },
    { label: "Active", value: String(counted.length) },
  ]

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Track every subscription in one place."
        rightSlot={
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white shadow-[0_4px_24px_rgba(124,92,255,0.35)] hover:opacity-90 transition"
          >
            <Plus className="size-4" />
            Add subscription
          </button>
        }
      />

      {loading ? (
        <DashboardSkeleton />
      ) : subscriptions.length === 0 ? (
        <EmptyState onAdd={() => setAddOpen(true)} />
      ) : (
        <>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border-subtle bg-surface p-5"
              >
                <div className="text-xs text-text-muted uppercase tracking-wide">
                  {s.label}
                </div>
                <div className="mt-1 text-3xl font-semibold tabular">
                  {s.value}
                </div>
              </div>
            ))}
          </section>

          <div className="space-y-6">
            <UpcomingRenewals
              subscriptions={subscriptions}
              onSelect={(s) => setSelectedId(s.id)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <CategoryDonutChart subscriptions={subscriptions} />
              </div>
              <div className="lg:col-span-2">
                <SmartInsightsPanel subscriptions={subscriptions} />
              </div>
            </div>

            <ActiveSubscriptions
              subscriptions={subscriptions}
              onSelect={(s) => setSelectedId(s.id)}
            />
          </div>
        </>
      )}

      <AddSubscriptionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
        existingServiceIds={existingServiceIds}
      />

      <SubscriptionDetailDrawer
        subscription={selected}
        onClose={() => setSelectedId(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  )
}
