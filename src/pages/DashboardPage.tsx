import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import TopBar from "../components/layout/TopBar"
import AddSubscriptionModal from "../components/add/AddSubscriptionModal"
import ActiveSubscriptions from "../components/dashboard/ActiveSubscriptions"
import CategoryDonutChart from "../components/dashboard/CategoryDonutChart"
import SmartInsightsPanel from "../components/dashboard/SmartInsightsPanel"
import UpcomingRenewals from "../components/dashboard/UpcomingRenewals"
import SubscriptionDetailDrawer from "../components/detail/SubscriptionDetailDrawer"
import { useSubscriptions } from "../hooks/useSubscriptions"
import { formatMoney, normalizeToYearly } from "../lib/money"
import type { SubscriptionInput } from "../types"

export default function DashboardPage() {
  const { subscriptions, loading, add, update, remove } = useSubscriptions()
  const [addOpen, setAddOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = selectedId
    ? (subscriptions.find((s) => s.id === selectedId) ?? null)
    : null

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

  const showDashboardSections =
    !loading && subscriptions.length > 0

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

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
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

      {loading && (
        <div className="rounded-2xl border border-border-subtle bg-surface p-10 text-center text-sm text-text-secondary">
          Loading subscriptions...
        </div>
      )}

      {!loading && subscriptions.length === 0 && (
        <section className="rounded-2xl border border-border-subtle bg-surface p-10 text-center">
          <h2 className="text-lg font-medium">No subscriptions yet</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Add your first subscription to see totals, charts, and insights.
          </p>
        </section>
      )}

      {showDashboardSections && (
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
        onUpdate={update}
        onDelete={remove}
      />
    </>
  )
}
