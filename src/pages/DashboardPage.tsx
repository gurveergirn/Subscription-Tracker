import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import TopBar from "../components/layout/TopBar"
import AddSubscriptionModal from "../components/add/AddSubscriptionModal"
import ActiveSubscriptions from "../components/dashboard/ActiveSubscriptions"
import { useSubscriptions } from "../hooks/useSubscriptions"
import { formatMoney, normalizeToYearly } from "../lib/money"
import type { Subscription, SubscriptionInput } from "../types"

export default function DashboardPage() {
  const { subscriptions, loading, add } = useSubscriptions()
  const [addOpen, setAddOpen] = useState(false)
  // Detail drawer wired in step 9.
  const [, setSelected] = useState<Subscription | null>(null)

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
    await add(input)
  }

  const stats = [
    { label: "Monthly", value: formatMoney(totalMonthly) },
    { label: "Yearly", value: formatMoney(totalYearly) },
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

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border-subtle bg-surface p-5"
          >
            <div className="text-xs text-text-muted uppercase tracking-wide">
              {s.label}
            </div>
            <div className="mt-1 text-3xl font-semibold tabular">{s.value}</div>
          </div>
        ))}
      </section>

      {loading ? (
        <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-secondary">
          Loading subscriptions...
        </div>
      ) : subscriptions.length === 0 ? (
        <section className="rounded-2xl border border-border-subtle bg-surface p-10 text-center">
          <h2 className="text-lg font-medium">No subscriptions yet</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Add your first subscription to see totals, charts, and insights.
          </p>
        </section>
      ) : (
        <ActiveSubscriptions
          subscriptions={subscriptions}
          onSelect={setSelected}
        />
      )}

      <AddSubscriptionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
        existingServiceIds={existingServiceIds}
      />
    </>
  )
}
